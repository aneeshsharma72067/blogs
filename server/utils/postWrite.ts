import type { H3Event } from 'h3'

import { createError } from 'h3'

import { toSlug } from './slug'
import { getServiceSupabaseClient, getUserSupabaseClient } from './supabase'

export type PostWriteInput = {
  title: string
  bodyHtml: string
  status: 'draft' | 'published'
}

const ensureUniqueSlug = async (event: H3Event, title: string, excludeId?: string) => {
  const base = toSlug(title) || 'untitled'
  const service = getServiceSupabaseClient(event)

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidate = attempt === 0 ? base : `${base}-${attempt + 1}`

    const query = service
      .from('posts')
      .select('id')
      .eq('slug', candidate)
      .limit(1)

    const scopedQuery = excludeId ? query.neq('id', excludeId) : query
    const { data, error } = await scopedQuery

    if (error) {
      throw createError({ statusCode: 500, statusMessage: `Failed to validate slug uniqueness: ${error.message}` })
    }

    if (!data || data.length === 0) {
      return candidate
    }
  }

  throw createError({ statusCode: 500, statusMessage: 'Unable to generate a unique slug.' })
}

const getNextSequence = async (event: H3Event) => {
  const service = getServiceSupabaseClient(event)
  const { data, error } = await service
    .from('posts')
    .select('sequence')
    .order('sequence', { ascending: false })
    .limit(1)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Failed to calculate sequence: ${error.message}` })
  }

  return (data?.[0]?.sequence ?? 0) + 1
}

export const createPostForUser = async (
  event: H3Event,
  userId: string,
  accessToken: string,
  input: PostWriteInput,
) => {
  const userClient = getUserSupabaseClient(event, accessToken)
  const slug = await ensureUniqueSlug(event, input.title)
  const sequence = await getNextSequence(event)
  const now = new Date().toISOString()

  const { data, error } = await userClient
    .from('posts')
    .insert({
      author_id: userId,
      sequence,
      slug,
      title: input.title,
      body_html: input.bodyHtml,
      status: input.status,
      published_at: input.status === 'published' ? now : null,
    })
    .select('id, slug, status')
    .single()

  if (error || !data) {
    throw createError({ statusCode: 500, statusMessage: `Failed to create post: ${error?.message ?? 'Unknown error'}` })
  }

  return data
}

export const updatePostForUser = async (
  event: H3Event,
  userId: string,
  accessToken: string,
  postId: string,
  input: PostWriteInput,
) => {
  const userClient = getUserSupabaseClient(event, accessToken)
  const slug = await ensureUniqueSlug(event, input.title, postId)
  const now = new Date().toISOString()

  const { data, error } = await userClient
    .from('posts')
    .update({
      title: input.title,
      slug,
      body_html: input.bodyHtml,
      status: input.status,
      published_at: input.status === 'published' ? now : null,
    })
    .eq('id', postId)
    .eq('author_id', userId)
    .select('id, slug, status')
    .single()

  if (error || !data) {
    const statusCode = error?.code === 'PGRST116' ? 404 : 500
    throw createError({
      statusCode,
      statusMessage: statusCode === 404 ? 'Post not found.' : `Failed to update post: ${error?.message ?? 'Unknown error'}`,
    })
  }

  return data
}

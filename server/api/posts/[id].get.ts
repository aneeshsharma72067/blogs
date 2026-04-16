import { getRouterParam } from 'h3'
import { z } from 'zod'

import { mapPostRowToHomePost } from '../../utils/postMapper'
import { getAnonSupabaseClient } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'id')
  const parsedParam = z.string().min(1, 'Post slug is required.').safeParse(param)

  if (!parsedParam.success) {
    throw createError({ statusCode: 400, statusMessage: parsedParam.error.issues[0]?.message ?? 'Post slug is required.' })
  }

  const supabase = getAnonSupabaseClient(event)
  const { data, error } = await supabase
    .from('posts')
    .select('id, author_id, sequence, slug, title, body_html, status, featured, created_at, updated_at, published_at')
    .eq('slug', parsedParam.data)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch post: ${error.message}` })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found.' })
  }

  return mapPostRowToHomePost(data)
})
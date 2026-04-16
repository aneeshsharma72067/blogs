import { getRouterParam } from 'h3'
import { z } from 'zod'

import { getAuthCookies, getUserSupabaseClient, requireAuthenticatedUser } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const param = z.string().uuid('Post id must be a valid UUID.').safeParse(getRouterParam(event, 'id'))

  if (!param.success) {
    throw createError({ statusCode: 400, statusMessage: param.error.issues[0]?.message ?? 'Invalid post id.' })
  }

  const user = await requireAuthenticatedUser(event)
  const { accessToken } = getAuthCookies(event)

  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const userClient = getUserSupabaseClient(event, accessToken)
  const { data, error } = await userClient
    .from('posts')
    .delete()
    .eq('id', param.data)
    .eq('author_id', user.id)
    .select('id')
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Failed to delete post: ${error.message}` })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found.' })
  }

  return { ok: true }
})

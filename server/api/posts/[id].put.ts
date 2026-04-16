import { getRouterParam } from 'h3'
import { z } from 'zod'

import { updatePostForUser } from '../../utils/postWrite'
import { getAuthCookies, requireAuthenticatedUser } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const param = z.string().uuid('Post id must be a valid UUID.').safeParse(getRouterParam(event, 'id'))

  if (!param.success) {
    throw createError({ statusCode: 400, statusMessage: param.error.issues[0]?.message ?? 'Invalid post id.' })
  }

  const schema = z.object({
    title: z.string().trim().min(1, 'Title is required.'),
    bodyHtml: z.string().trim().min(1, 'Body is required.'),
    status: z.enum(['draft', 'published']),
  })
  const parsedBody = schema.safeParse(await readBody(event))

  if (!parsedBody.success) {
    throw createError({ statusCode: 400, statusMessage: parsedBody.error.issues[0]?.message ?? 'Invalid post payload.' })
  }

  const user = await requireAuthenticatedUser(event)
  const { accessToken } = getAuthCookies(event)

  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const post = await updatePostForUser(event, user.id, accessToken, param.data, {
    title: parsedBody.data.title,
    bodyHtml: parsedBody.data.bodyHtml,
    status: parsedBody.data.status,
  })

  return {
    ok: true,
    id: post.id,
    slug: post.slug,
    status: post.status,
  }
})

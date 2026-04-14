import { requireAdminSession } from '../../utils/adminAuth'
import { savePost } from '../../utils/postStore'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const body = await readBody<{ id?: string | null; title?: string; bodyHtml?: string; status?: 'draft' | 'published' }>(event)

  if (!body?.title?.trim() || !body?.bodyHtml?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Title and body are required' })
  }

  if (body.status !== 'draft' && body.status !== 'published') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post status' })
  }

  const post = await savePost({
    id: body.id,
    title: body.title.trim(),
    bodyHtml: body.bodyHtml,
    status: body.status,
  })

  return {
    ok: true,
    id: post.id,
    status: post.status,
  }
})
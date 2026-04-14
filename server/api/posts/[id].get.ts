import { getRouterParam } from 'h3'
import { getPublicPostById } from '../../utils/postStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Post id is required.' })
  }

  const post = await getPublicPostById(id)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found.' })
  }

  return post
})
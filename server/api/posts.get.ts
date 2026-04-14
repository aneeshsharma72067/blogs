import { listPublicPosts } from '../utils/postStore'

export default defineEventHandler(async () => listPublicPosts())
import { mapPostRowToHomePost } from '../utils/postMapper'
import { getAnonSupabaseClient } from '../utils/supabase'

export default defineEventHandler(async (event) => {
	const supabase = getAnonSupabaseClient(event)
	const { data, error } = await supabase
		.from('posts')
		.select('id, author_id, sequence, slug, title, body_html, status, featured, created_at, updated_at, published_at')
		.eq('status', 'published')
		.order('created_at', { ascending: false })

	if (error) {
		throw createError({ statusCode: 500, statusMessage: `Failed to fetch posts: ${error.message}` })
	}

	return (data ?? []).map(mapPostRowToHomePost)
})
import type { PostgrestError } from '@supabase/supabase-js'

import type { HomePost } from '../../types/home-post'
import type { Database } from '../../types/supabase'

type PostRow = Database['public']['Tables']['posts']['Row']

interface PostPayload {
  title: string
  bodyHtml: string
  status: 'draft' | 'published'
}

interface PostMutationResponse {
  ok: true
  id: string
  slug: string
  status: 'draft' | 'published'
}

const formatPublishedLabel = (date: string | null) => {
  if (!date) {
    return 'Published'
  }

  return `Published ${new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))}`
}

const toHomePost = (post: PostRow): HomePost => ({
  id: post.slug,
  sequence: post.sequence,
  essayLabel: `Essay No. ${String(post.sequence).padStart(3, '0')}`,
  published: formatPublishedLabel(post.published_at),
  title: post.title,
  bodyHtml: post.body_html,
  featured: post.featured,
})

const throwPostError = (error: PostgrestError | null) => {
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
}

export const usePosts = () => {
  const supabase = useSupabaseClient<Database>()

  const fetchPublishedPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, author_id, sequence, slug, title, body_html, status, featured, created_at, updated_at, published_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    throwPostError(error)
    return (data ?? []).map(toHomePost)
  }

  const fetchPostBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, author_id, sequence, slug, title, body_html, status, featured, created_at, updated_at, published_at')
      .eq('status', 'published')
      .eq('slug', slug)
      .maybeSingle()

    throwPostError(error)

    if (!data) {
      throw createError({ statusCode: 404, statusMessage: 'Post not found.' })
    }

    return toHomePost(data)
  }

  const createPost = async (payload: PostPayload) => $fetch<PostMutationResponse>('/api/posts', {
    method: 'POST',
    body: payload,
  })

  const updatePost = async (id: string, payload: PostPayload) => $fetch<PostMutationResponse>(`/api/posts/${id}`, {
    method: 'PUT',
    body: payload,
  })

  const deletePost = async (id: string) => $fetch<{ ok: true }>(`/api/posts/${id}`, {
    method: 'DELETE',
  })

  return {
    fetchPublishedPosts,
    fetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
  }
}

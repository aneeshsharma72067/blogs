import type { HomePost } from '../../types/home-post'
import type { Database } from '../../types/supabase'

type PostRow = Database['public']['Tables']['posts']['Row']

const formatPublishedLabel = (date: string | null) => {
  if (!date) {
    return 'Published'
  }

  return `Published ${new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))}`
}

const essayLabelFor = (sequence: number) => `Essay No. ${String(sequence).padStart(3, '0')}`

export const mapPostRowToHomePost = (post: PostRow): HomePost => ({
  id: post.slug,
  sequence: post.sequence,
  essayLabel: essayLabelFor(post.sequence),
  published: formatPublishedLabel(post.published_at),
  title: post.title,
  bodyHtml: post.body_html,
  featured: post.featured,
})

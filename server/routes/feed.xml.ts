import { Feed } from 'feed'
import { getRequestURL, setHeader } from 'h3'

import { getAnonSupabaseClient } from '../utils/supabase'

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const excerptFromHtml = (html: string) => {
  const text = stripHtml(html)
  return text.slice(0, 220)
}

const toDate = (value: string | null) => {
  if (!value) {
    return new Date()
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}

export default defineEventHandler(async (event) => {
  const supabase = getAnonSupabaseClient(event)
  const { data, error } = await supabase
    .from('posts')
    .select('id, author_id, sequence, slug, title, body_html, status, featured, created_at, updated_at, published_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch posts for RSS feed: ${error.message}` })
  }

  const config = useRuntimeConfig(event)
  const publicConfig = config.public as Record<string, string | undefined>
  const siteUrl = publicConfig.siteUrl?.trim() || getRequestURL(event).origin

  const feed = new Feed({
    title: 'The Nocturnal Manuscript',
    description: 'A personal blog exploring software engineering, system design, and thoughtful building.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    updated: new Date(),
    author: {
      name: 'Deep Ink Editorial',
    },
  })

  for (const post of data ?? []) {
    const postUrl = `${siteUrl}/posts/${post.slug}`
    const bodyHtml = post.body_html ?? ''

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: excerptFromHtml(bodyHtml),
      content: bodyHtml,
      date: toDate(post.published_at ?? post.created_at),
      author: [{ name: 'Deep Ink Editorial' }],
    })
  }

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return feed.rss2()
})

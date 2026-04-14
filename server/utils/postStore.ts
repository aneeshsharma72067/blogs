import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export type PostStatus = 'draft' | 'published'

export interface StoredPost {
  id: string
  sequence: number
  title: string
  bodyHtml: string
  status: PostStatus
  featured?: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface PublicPost {
  id: string
  sequence: number
  essayLabel: string
  published: string
  title: string
  bodyHtml: string
  featured?: boolean
}

const postsFilePath = join(process.cwd(), 'server', 'data', 'posts.json')

const seedPosts: StoredPost[] = [
  {
    id: 'seed-042',
    sequence: 42,
    title: 'The Silent Architecture of Midnight',
    bodyHtml: '<p>In the quietude of the third hour, the world breathes differently. The digital noise that consumes our daylight hours retreats, leaving behind a vacuum that only thought can fill. We often mistake silence for an absence, but in reality, it is a structure.</p><p>Architecture is not just about stone and glass; it is about how we inhabit space. When the sun disappears, the physical space of our rooms shrinks, and the mental space of our consciousness expands to fill the void. This is where the manuscript begins - not with a pen, but with the realization that we are finally alone.</p><blockquote>Silence is not the absence of sound, but the presence of focus. It is the inkwell from which all meaningful architecture is drawn.</blockquote>',
    status: 'published',
    featured: true,
    createdAt: '2024-11-18T09:00:00.000Z',
    updatedAt: '2024-11-18T09:00:00.000Z',
    publishedAt: '2024-11-18T09:00:00.000Z',
  },
  {
    id: 'seed-041',
    sequence: 41,
    title: 'On the Persistence of Analog Memory',
    bodyHtml: '<p>We are living in an era of digital evaporation. Our photos live in clouds, our letters are transient packets of data, and our memories are indexed by algorithms. Yet, there remains a primal urge for the physical - for the grain of paper, the smudge of ink, and the weight of a bound book.</p><p>The digital screen offers us infinite possibilities, but it lacks the friction required for true retention. Friction is where meaning is made. When a pen moves across paper, the resistance creates a tactile anchor for the thought. Without that physical anchor, ideas often drift away as quickly as they arrived.</p><p>As we move further into the ephemeral, the nocturnal manuscript becomes a protest. It is an attempt to reclaim the permanence of thought, even if the medium remains digital. We style our screens to mimic the depth of parchment and the gravity of leaded type.</p>',
    status: 'published',
    createdAt: '2024-10-06T09:00:00.000Z',
    updatedAt: '2024-10-06T09:00:00.000Z',
    publishedAt: '2024-10-06T09:00:00.000Z',
  },
  {
    id: 'seed-040',
    sequence: 40,
    title: 'The Luxury of Negative Space',
    bodyHtml: '<p>In modern design, we are taught to fear the empty. We fill every pixel with a call to action, a navigation link, or a suggested article. We have forgotten that the most luxurious thing an interface can provide is the freedom to look away.</p><p>Negative space is the breath of the layout. It provides the pause required for digestion. In an age of information density, the act of deliberately leaving a canvas empty is a radical act of hospitality for the reader&apos;s attention.</p>',
    status: 'published',
    createdAt: '2024-09-14T09:00:00.000Z',
    updatedAt: '2024-09-14T09:00:00.000Z',
    publishedAt: '2024-09-14T09:00:00.000Z',
  },
]

const formatPublishedLabel = (date: string) => `Published ${new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
}).format(new Date(date))}`

const essayLabelFor = (sequence: number) => `Essay No. ${String(sequence).padStart(3, '0')}`

const sortPosts = (posts: StoredPost[]) => [...posts].sort((left, right) => right.sequence - left.sequence)

const ensureStore = async () => {
  try {
    await readFile(postsFilePath, 'utf8')
  } catch {
    await mkdir(join(process.cwd(), 'server', 'data'), { recursive: true })
    await writeFile(postsFilePath, JSON.stringify(seedPosts, null, 2), 'utf8')
  }
}

export const readStoredPosts = async () => {
  await ensureStore()
  const raw = await readFile(postsFilePath, 'utf8')
  return sortPosts(JSON.parse(raw) as StoredPost[])
}

export const writeStoredPosts = async (posts: StoredPost[]) => {
  await mkdir(join(process.cwd(), 'server', 'data'), { recursive: true })
  await writeFile(postsFilePath, JSON.stringify(sortPosts(posts), null, 2), 'utf8')
}

export const savePost = async (input: {
  id?: string | null
  title: string
  bodyHtml: string
  status: PostStatus
}) => {
  const posts = await readStoredPosts()
  const now = new Date().toISOString()
  const existing = input.id ? posts.find((post) => post.id === input.id) : undefined
  const sequence = existing?.sequence ?? (posts[0]?.sequence ?? 39) + 1

  const post: StoredPost = {
    id: existing?.id ?? `post-${sequence}-${Date.now()}`,
    sequence,
    title: input.title,
    bodyHtml: input.bodyHtml,
    status: input.status,
    featured: existing?.featured ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    publishedAt: input.status === 'published' ? now : existing?.publishedAt,
  }

  const nextPosts = existing
    ? posts.map((entry) => (entry.id === existing.id ? post : entry))
    : [...posts, post]

  await writeStoredPosts(nextPosts)

  return post
}

export const listPublicPosts = async (): Promise<PublicPost[]> => {
  const posts = await readStoredPosts()

  return posts
    .filter((post) => post.status === 'published')
    .map((post) => ({
      id: post.id,
      sequence: post.sequence,
      essayLabel: essayLabelFor(post.sequence),
      published: post.publishedAt ? formatPublishedLabel(post.publishedAt) : 'Published',
      title: post.title,
      bodyHtml: post.bodyHtml,
      featured: post.featured,
    }))
}
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { createClient } from '@supabase/supabase-js'

import type { Database } from '../types/supabase'

interface LegacyPost {
  id: string
  sequence: number
  title: string
  bodyHtml: string
  status: 'draft' | 'published'
  featured?: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

const required = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required.`)
  }

  return value
}

const getMigrationAuthorId = async (supabase: ReturnType<typeof createClient<Database>>) => {
  if (process.env.SUPABASE_MIGRATION_AUTHOR_ID) {
    return process.env.SUPABASE_MIGRATION_AUTHOR_ID
  }

  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 })

  if (error) {
    throw new Error(`Failed to resolve migration author id: ${error.message}`)
  }

  const firstUser = data.users[0]

  if (!firstUser) {
    throw new Error('No Supabase Auth users found. Create a user first or set SUPABASE_MIGRATION_AUTHOR_ID.')
  }

  return firstUser.id
}

const run = async () => {
  const supabaseUrl = required('SUPABASE_URL')
  const supabaseServiceKey = required('SUPABASE_SERVICE_KEY')

  const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const authorId = await getMigrationAuthorId(supabase)
  const sourcePath = join(process.cwd(), 'server', 'data', 'posts.json')
  const raw = await readFile(sourcePath, 'utf8')
  const legacyPosts = JSON.parse(raw) as LegacyPost[]

  if (legacyPosts.length === 0) {
    console.log('No posts found in server/data/posts.json')
    return
  }

  const rows: Database['public']['Tables']['posts']['Insert'][] = legacyPosts.map((post) => ({
    author_id: authorId,
    sequence: post.sequence,
    slug: post.id,
    title: post.title,
    body_html: post.bodyHtml,
    status: post.status,
    featured: post.featured ?? false,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
    published_at: post.publishedAt ?? null,
  }))

  const { error } = await supabase
    .from('posts')
    .upsert(rows, { onConflict: 'slug' })

  if (error) {
    throw new Error(`Migration failed: ${error.message}`)
  }

  console.log(`Migrated ${rows.length} posts successfully.`)
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown migration error'
  console.error(message)
  process.exitCode = 1
})

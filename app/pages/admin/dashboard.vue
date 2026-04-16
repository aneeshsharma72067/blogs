<script setup lang="ts">
import AppHeader from '../../../components/site/AppHeader.vue'
import AdminRichTextEditor from '../../../components/admin/AdminRichTextEditor.vue'

definePageMeta({
  middleware: 'admin-auth',
})

useHead({
  title: 'Manuscript | Admin Dashboard',
  meta: [{ name: 'description', content: 'Secure dashboard for drafting new manuscripts.' }],
})

const title = ref('')
const body = ref('')
const postId = ref<string | null>(null)
const status = ref<'idle' | 'saving' | 'saved' | 'publishing' | 'published' | 'error'>('idle')
const statusMessage = ref('')
const { createPost, updatePost } = usePosts()
const { logout: logoutUser } = useAuth()

const hasContent = (value: string) => value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0

const persistPost = async (nextStatus: 'draft' | 'published') => {
  if (!title.value.trim() || !hasContent(body.value)) {
    status.value = 'error'
    statusMessage.value = 'Add both a title and body before saving.'
    return null
  }

  status.value = nextStatus === 'draft' ? 'saving' : 'publishing'
  statusMessage.value = ''

  const payload = {
    title: title.value.trim(),
    bodyHtml: body.value,
    status: nextStatus,
  } as const

  const post = postId.value
    ? await updatePost(postId.value, payload)
    : await createPost(payload)

  postId.value = post.id
  status.value = nextStatus === 'draft' ? 'saved' : 'published'
  statusMessage.value = nextStatus === 'draft'
    ? 'Draft saved to the server.'
    : 'Post published and visible on the home screen.'

  return post
}

const saveDraft = async () => {
  try {
    await persistPost('draft')
  } catch {
    status.value = 'error'
    statusMessage.value = 'Unable to save draft right now.'
  }
}

const publish = async () => {
  try {
    await persistPost('published')
    await refreshNuxtData('home-posts')
    title.value = ''
    body.value = ''
    postId.value = null
    await navigateTo('/')
  } catch {
    status.value = 'error'
    statusMessage.value = 'Unable to publish right now.'
  }
}

const logout = async () => {
  await logoutUser()
  await navigateTo('/admin')
}
</script>

<template>
  <div class="min-h-screen bg-background text-on-surface">
    <AppHeader active="admin" />

    <main class="mx-auto max-w-5xl px-6 pb-20 pt-32">
      <div class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <p class="mb-4 font-label text-[11px] uppercase tracking-[0.2em] text-primary">Composer</p>
          <h1 class="font-headline text-5xl font-extrabold leading-none tracking-tight">Drafting New Manuscript</h1>
        </div>
        <div class="flex gap-4">
          <button type="button" class="rounded-lg border border-outline-variant/30 px-6 py-2.5 font-label text-xs uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-container-high" @click="saveDraft">Save Draft</button>
          <button type="button" class="rounded-lg bg-primary-container px-8 py-2.5 font-label text-xs font-bold uppercase tracking-widest text-on-primary transition-all hover:brightness-110 active:scale-95" @click="publish">Publish</button>
          <button type="button" class="rounded-lg border border-outline-variant/30 px-4 py-2.5 font-label text-xs uppercase tracking-widest text-outline transition-colors hover:text-primary" @click="logout">Logout</button>
        </div>
      </div>

      <section class="space-y-12">
        <div class="group">
          <label for="post-title" class="mb-3 block font-label text-[11px] uppercase tracking-widest text-outline">Post Title</label>
          <input
            id="post-title"
            v-model="title"
            type="text"
            placeholder="Enter a compelling title..."
            class="w-full border-0 border-b-2 border-outline-variant/20 bg-transparent py-4 font-headline text-4xl font-bold text-on-surface outline-none transition-colors placeholder:text-surface-variant focus:border-primary focus:ring-0"
          >
        </div>

        <AdminRichTextEditor v-model="body" />
      </section>

      <div class="mt-16 rounded-r-xl border-l-4 border-primary bg-primary-container/10 p-8">
        <h3 class="mb-2 font-label text-[11px] uppercase tracking-widest text-primary">Writing Guide</h3>
        <p class="font-body text-on-surface-variant">The Nocturnal Manuscript values depth over speed. Ensure your content is legible, thoughtfully structured, and evocative. Use the whitespace of the editor to breathe between your paragraphs.</p>
      </div>

      <p v-if="status !== 'idle'" class="mt-6 font-label text-[11px] uppercase tracking-widest text-primary">
        {{ statusMessage }}
      </p>
    </main>

    <footer class="mt-20 w-full border-t border-primary/10 bg-surface-container-lowest py-16">
      <div class="flex flex-col items-center gap-4">
        <div class="mb-4 flex gap-8">
          <a href="#" class="font-body text-sm italic text-on-surface/40 transition-colors hover:text-primary">Privacy Policy</a>
          <a href="#" class="font-body text-sm italic text-on-surface/40 transition-colors hover:text-primary">Terms of Service</a>
          <a href="#" class="font-body text-sm italic text-on-surface/40 transition-colors hover:text-primary">RSS Feed</a>
        </div>
        <p class="font-body text-sm italic text-on-surface/50">© 2024 The Nocturnal Manuscript. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
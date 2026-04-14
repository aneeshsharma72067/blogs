<script setup lang="ts">
import { computed } from 'vue'
import type { HomePost } from '../../../types/home-post'
import AppFooter from '../../../components/site/AppFooter.vue'
import AppHeader from '../../../components/site/AppHeader.vue'

const route = useRoute()
const postId = computed(() => String(route.params.id ?? ''))

const { data: post, pending, error } = await useAsyncData<HomePost>(
  () => `post-${postId.value}`,
  () => $fetch(`/api/posts/${postId.value}`),
  { watch: [postId] },
)

const { data: allPosts } = await useAsyncData<HomePost[]>(
  'public-posts-for-related',
  () => $fetch('/api/posts'),
  { default: () => [] },
)

const relatedPosts = computed(() =>
  allPosts.value
    .filter((entry) => entry.id !== post.value?.id)
    .slice(0, 3),
)

const estimatedReadMinutes = computed(() => {
  const html = post.value?.bodyHtml ?? ''
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.length ? text.split(' ').length : 0
  return Math.max(1, Math.ceil(words / 220))
})

const pageTitle = computed(() =>
  post.value?.title ? `${post.value.title} | Manuscript` : 'Post Not Found | Manuscript',
)

const pageDescription = computed(() => {
  const html = post.value?.bodyHtml ?? ''
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.slice(0, 150) || 'Read this manuscript entry in a dark minimal reading layout.'
})

useHead(() => ({
  title: pageTitle.value,
  meta: [{ name: 'description', content: pageDescription.value }],
}))
</script>

<template>
  <div class="min-h-screen bg-background text-on-background">
    <AppHeader active="essays" />

    <main class="px-6 pb-24 pt-32 sm:px-8">
      <div v-if="pending" class="mx-auto max-w-5xl animate-pulse space-y-6">
        <div class="h-4 w-40 rounded bg-surface-container-high" />
        <div class="h-12 w-full rounded bg-surface-container-high" />
        <div class="h-12 w-4/5 rounded bg-surface-container-high" />
        <div class="h-4 w-56 rounded bg-surface-container-high" />
      </div>

      <article v-else-if="post" class="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-[1fr_300px]">
        <div class="lg:max-w-2xl">
          <header class="mb-14">
            <span class="mb-6 inline-flex rounded-full bg-primary/10 px-3 py-1 font-label text-[11px] font-bold uppercase tracking-[0.15rem] text-primary">
              {{ post.essayLabel }}
            </span>

            <h1 class="mb-8 font-headline text-5xl font-extrabold leading-[1.08] tracking-tight text-on-surface md:text-6xl">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-4 font-label text-[11px] uppercase tracking-widest text-outline">
              <span>{{ post.published }}</span>
              <span class="h-1.5 w-1.5 rounded-full bg-primary/35" />
              <span>{{ estimatedReadMinutes }} minute read</span>
            </div>
          </header>

          <section class="post-detail-body text-lg leading-[1.85] text-on-surface-variant" v-html="post.bodyHtml" />

          <footer class="mt-16 border-t border-outline-variant/20 pt-8">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-primary transition-transform hover:translate-x-1"
            >
              Back to Essays
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </NuxtLink>
          </footer>
        </div>

        <aside class="hidden space-y-14 lg:block">
          <section>
            <h2 class="mb-7 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-outline">Author</h2>
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-surface-container-high">
                <span class="material-symbols-outlined text-primary">edit_note</span>
              </div>
              <div>
                <p class="font-headline text-sm font-bold text-on-surface">Deep Ink Editorial</p>
                <p class="font-body text-xs italic text-outline">Lead Curator</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="mb-7 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-outline">Related Essays</h2>
            <div class="space-y-7">
              <NuxtLink
                v-for="related in relatedPosts"
                :key="related.id"
                :to="`/posts/${related.id}`"
                class="group block"
              >
                <p class="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{{ related.essayLabel }}</p>
                <p class="font-headline text-sm font-bold text-on-surface transition-colors group-hover:text-primary">{{ related.title }}</p>
              </NuxtLink>
            </div>
          </section>

          <section class="rounded-xl bg-surface-container-low p-7">
            <h2 class="mb-3 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Newsletter</h2>
            <p class="mb-5 font-body text-xs italic text-outline">Join the nocturnal circulation for weekly deep reads.</p>
            <div class="space-y-3">
              <input
                type="email"
                placeholder="Your email..."
                class="w-full border-b-2 border-outline-variant bg-transparent py-2 font-label text-sm outline-none transition-colors placeholder:text-outline/40 focus:border-primary"
              >
              <button
                type="button"
                class="w-full rounded-md bg-linear-to-br from-primary to-primary-container py-3 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary transition-transform hover:scale-[0.99]"
              >
                Subscribe
              </button>
            </div>
          </section>
        </aside>
      </article>

      <section v-else class="mx-auto max-w-3xl py-20 text-center">
        <h1 class="mb-4 font-headline text-4xl font-extrabold text-on-surface">Post not found</h1>
        <p class="mb-8 font-body text-on-surface-variant">This manuscript may have been removed or is no longer published.</p>
        <NuxtLink
          to="/"
          class="inline-flex rounded-md bg-primary px-6 py-3 font-label text-xs font-bold uppercase tracking-widest text-on-primary"
        >
          Back to home feed
        </NuxtLink>
      </section>

      <p v-if="error" class="mx-auto mt-10 max-w-3xl text-center font-label text-xs uppercase tracking-widest text-outline">
        Unable to load the manuscript right now.
      </p>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.post-detail-body :deep(p) {
  margin: 0 0 1.7rem;
}

.post-detail-body :deep(p:first-child)::first-letter {
  float: left;
  margin-right: 0.6rem;
  font-family: var(--font-headline);
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 800;
  color: var(--color-primary);
}

.post-detail-body :deep(blockquote) {
  margin: 2.5rem 0;
  border-left: 4px solid rgb(85 221 173 / 0.85);
  background: rgb(85 221 173 / 0.1);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1.3rem 1.6rem;
  font-style: italic;
  color: rgb(222 226 245 / 0.92);
}

.post-detail-body :deep(h2),
.post-detail-body :deep(h3),
.post-detail-body :deep(h4) {
  margin: 2.4rem 0 1rem;
  font-family: var(--font-headline);
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-on-surface);
}

.post-detail-body :deep(h2) {
  font-size: 2rem;
}

.post-detail-body :deep(h3) {
  font-size: 1.5rem;
}

.post-detail-body :deep(ul),
.post-detail-body :deep(ol) {
  margin: 0 0 1.6rem;
  padding-left: 1.35rem;
}

.post-detail-body :deep(li + li) {
  margin-top: 0.45rem;
}

.post-detail-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.post-detail-body :deep(pre) {
  margin: 2rem 0;
  overflow-x: auto;
  border-radius: 0.75rem;
  background: rgb(16 20 28 / 0.95);
  padding: 1.2rem 1.4rem;
  color: rgb(220 226 240);
}

.post-detail-body :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
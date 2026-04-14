<script setup lang="ts">
import type { HomePost } from '../../types/home-post'

defineProps<{
  post: HomePost
}>()
</script>

<template>
  <article class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
    <div class="md:col-span-8">
      <span
        v-if="post.featured"
        class="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-primary"
      >
        Featured
      </span>
      <h2 class="mb-8 font-headline text-4xl font-bold leading-tight text-on-surface">
        <NuxtLink
          :to="`/posts/${post.id}`"
          class="transition-colors hover:text-primary"
        >
          {{ post.title }}
        </NuxtLink>
      </h2>

      <div class="post-body font-body text-lg leading-[1.8] text-on-surface-variant" v-html="post.bodyHtml" />
    </div>

    <div class="md:col-span-4 flex flex-col items-start pt-4 md:items-end">
      <span class="mb-2 font-label text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
        {{ post.essayLabel }}
      </span>
      <span class="font-label text-[11px] uppercase tracking-widest text-outline">
        {{ post.published }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.post-body :deep(p) {
  margin: 0 0 1.5rem;
}

.post-body :deep(p:last-child) {
  margin-bottom: 0;
}

.post-body :deep(blockquote) {
  margin: 2rem 0;
  border-left: 4px solid rgb(85 221 173 / 0.8);
  background: rgb(85 221 173 / 0.08);
  padding: 1.5rem 2rem;
  font-style: italic;
  color: rgb(219 226 224);
}

.post-body :deep(ul),
.post-body :deep(ol) {
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
}

.post-body :deep(li + li) {
  margin-top: 0.5rem;
}

.post-body :deep(pre) {
  margin: 2rem 0;
  overflow-x: auto;
  border-radius: 0.75rem;
  background: rgb(16 20 28 / 0.9);
  padding: 1.25rem 1.5rem;
  color: rgb(220 226 240);
}

.post-body :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.post-body :deep(a) {
  color: rgb(85 221 173);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
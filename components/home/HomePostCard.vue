<script setup lang="ts">
import { computed } from 'vue'
import type { HomePost } from '../../types/home-post'

const props = defineProps<{
  post: HomePost
}>()

const PREVIEW_MAX_CHARS = 420

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\r\n?/g, '\n')
    .trim()
}

function truncateSafely(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text
  }

  const paragraphs = text
    .split(/\n\s*\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (paragraphs.length > 1) {
    const selected: string[] = []
    let currentLength = 0

    for (const paragraph of paragraphs) {
      const nextLength = currentLength + paragraph.length + (selected.length > 0 ? 2 : 0)
      if (nextLength > maxChars) {
        break
      }

      selected.push(paragraph)
      currentLength = nextLength
    }

    if (selected.length > 0) {
      return selected.join('\n\n')
    }
  }

  const lines = text
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (lines.length > 1) {
    const selected: string[] = []
    let currentLength = 0

    for (const line of lines) {
      const nextLength = currentLength + line.length + (selected.length > 0 ? 1 : 0)
      if (nextLength > maxChars) {
        break
      }

      selected.push(line)
      currentLength = nextLength
    }

    if (selected.length > 0) {
      return selected.join('\n')
    }
  }

  const slice = text.slice(0, maxChars)
  const lastSpace = slice.lastIndexOf(' ')
  if (lastSpace > Math.floor(maxChars * 0.6)) {
    return `${slice.slice(0, lastSpace).trimEnd()}...`
  }

  return `${slice.trimEnd()}...`
}

const previewBody = computed(() => truncateSafely(htmlToText(props.post.bodyHtml), PREVIEW_MAX_CHARS))
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

      <p class="post-body font-body text-lg leading-[1.8] text-on-surface-variant">{{ previewBody }}</p>
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
.post-body {
  margin: 0;
  white-space: pre-line;
}
</style>
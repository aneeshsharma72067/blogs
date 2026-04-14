<script setup lang="ts">
import type { HomePost } from '../../types/home-post'

defineProps<{
  post: HomePost
}>()
</script>

<template>
  <article class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
    <div class="md:col-span-8">
      <h2
        class="mb-8 font-headline text-4xl font-bold leading-tight text-on-surface transition-colors hover:text-primary"
      >
        {{ post.title }}
      </h2>

      <div class="space-y-6 font-body text-lg leading-[1.8] text-on-surface-variant">
        <p
          v-for="paragraph in post.paragraphs"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>

      <div
        v-if="post.quote"
        class="my-10 rounded-lg border-l-4 border-primary-container bg-primary/10 p-8"
      >
        <p class="font-body italic text-on-surface">
          "{{ post.quote }}"
        </p>
      </div>
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
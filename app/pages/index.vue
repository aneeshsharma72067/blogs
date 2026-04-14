<script setup lang="ts">
import type { HomePost } from '../../types/home-post'
import AppFooter from '../../components/site/AppFooter.vue'
import AppHeader from '../../components/site/AppHeader.vue'
import HomeFeedList from '../../components/home/HomeFeedList.vue'
import HomeHero from '../../components/home/HomeHero.vue'

useHead({
  title: 'Manuscript - Home Feed',
  meta: [{ name: 'description', content: 'A dark minimal home feed for the Manuscript blog.' }],
})

const { data: posts } = await useAsyncData<HomePost[]>(
  'home-posts',
  () => $fetch('/api/posts'),
  { default: () => [] },
)
</script>

<template>
  <div class="min-h-screen bg-background text-on-background">
    <AppHeader active="essays" />
    <main id="feed" class="mx-auto min-h-screen max-w-7xl px-6 pb-20 pt-32 sm:px-8">
      <HomeHero
        title="Deep Ink &"
        highlighted="Nocturnal Thoughts."
        description="A sanctuary for the written word. Here, the interface disappears to make space for meditation, observation, and the architectural beauty of text."
      />

      <HomeFeedList :posts="posts" />

      <div class="mt-40 flex justify-center">
        <button class="group flex items-center gap-4 rounded-md bg-secondary-container px-8 py-4 text-on-secondary-container transition-all duration-300 hover:bg-primary hover:text-on-primary">
          <span class="font-label text-xs font-bold uppercase tracking-widest">Earlier Manuscripts</span>
          <span class="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
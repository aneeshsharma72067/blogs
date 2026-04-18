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

const { fetchPublishedPosts } = usePosts()

const { data: posts } = await useAsyncData<HomePost[]>(
  'home-posts',
  () => fetchPublishedPosts(),
  { default: () => [] },
)
</script>

<template>
  <div class="min-h-screen bg-background text-on-background">
    <AppHeader active="essays" />
    <main id="feed" class="mx-auto min-h-screen max-w-7xl px-6 pb-20 pt-32 sm:px-8">
      <HomeHero
        title="Building Things & Thinking Out"
        highlighted="Loud."
        description="Notes from someone still becoming. Here, half-formed ideas meet working code, and the gap between them is the whole point."
      />

      <HomeFeedList :posts="posts" />

     
    </main>

    <AppFooter />
  </div>
</template>
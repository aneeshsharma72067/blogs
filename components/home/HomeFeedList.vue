<script setup lang="ts">
import type { HomePost } from '../../types/home-post'
import HomePostCard from './HomePostCard.vue'

defineProps<{
  posts: HomePost[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-32">
    <HomePostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>
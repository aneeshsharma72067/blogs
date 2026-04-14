<script setup lang="ts">
defineProps<{
  title: string
  highlighted: string
  description: string
}>()
</script>

<template>
  <header class="mb-32 max-w-3xl pt-12">
    <h1 class="mb-8 font-headline text-5xl font-extrabold leading-none tracking-tight text-on-surface md:text-7xl">
      {{ title }}
      <span class="te   xt-primary">{{ highlighted }}</span>
    </h1>

    <p class="font-body text-xl italic leading-relaxed text-on-surface-variant">
      {{ description }}
    </p>
  </header>
</template>
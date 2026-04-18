<script setup lang="ts">
const footerLinks = [
  { label: 'RSS Feed', href: '/feed.xml' },
]
</script>

<template>
  <footer class="mt-20 w-full border-t border-primary/10 bg-surface-container-lowest py-16">
    <div class="flex flex-col items-center gap-4">
      <div class="mb-4 flex gap-8">
        <a
          v-for="link in footerLinks"
          :key="link.label"
          :href="link.href"
          class="font-body text-sm italic text-on-surface/40 opacity-80 transition-colors hover:text-primary hover:opacity-100"
        >
          {{ link.label }}
        </a>
      </div>

      <p class="font-body text-sm italic text-primary">
        © 2024 The Nocturnal Manuscript. All rights reserved.
      </p>
    </div>
  </footer>
</template>
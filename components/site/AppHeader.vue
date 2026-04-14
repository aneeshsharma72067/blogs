<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: 'essays' | 'about' | 'admin'
  }>(),
  {
    active: 'essays',
  },
)

const navigationItems = [
  { key: 'essays', label: 'Essays', to: '/' },
  { key: 'about', label: 'About', to: '/about' },
  { key: 'admin', label: 'Admin', to: '/admin' },
]
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-surface-container-low/70 backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
      <div class="font-headline text-2xl font-black text-on-surface">
        Manuscript
      </div>

      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.label"
          :to="item.to"
          class="font-label text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
          :class="active === item.key ? 'border-b border-primary/50 pb-1 text-primary' : 'text-outline hover:text-on-surface'"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="material-symbols-outlined rounded-full text-primary transition-transform duration-300 hover:scale-95 active:scale-90"
          aria-label="Open account menu"
        >
          account_circle
        </button>
      </div>
    </div>
  </nav>
</template>
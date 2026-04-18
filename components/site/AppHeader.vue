<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = withDefaults(
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

const navContainer = ref<HTMLElement | null>(null)
const navLinks = ref<(HTMLElement | null)[]>([])
const indicatorStyle = ref({ width: '0px', left: '0px' })

const updateIndicator = () => {
  const activeIndex = navigationItems.findIndex((item) => item.key === props.active)
  if (activeIndex >= 0 && navLinks.value[activeIndex]) {
    const link = navLinks.value[activeIndex]
    const { offsetWidth, offsetLeft } = link
    indicatorStyle.value = {
      width: `${offsetWidth}px`,
      left: `${offsetLeft}px`,
    }
  }
}

watch(() => props.active, () => {
  updateIndicator()
})

onMounted(() => {
  updateIndicator()
  window.addEventListener('resize', updateIndicator)
})
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-surface-container-low/70 backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
      <div class="font-headline text-2xl font-black text-on-surface">
        Stdout
      </div>

      <div ref="navContainer" class="relative hidden items-center gap-8 overflow-visible md:flex">
        <NuxtLink
          v-for="(item, index) in navigationItems"
          :key="item.label"
          :to="item.to"
          :ref="(el) => { if (el) navLinks[index] = el as HTMLElement }"
          class="font-label text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative pb-2"
          :class="props.active === item.key ? 'text-primary' : 'text-outline hover:text-on-surface'"
        >
          {{ item.label }}
        </NuxtLink>

        <div
          class="absolute bottom-0 h-1 bg-primary transition-all duration-300 ease-out"
          :style="{
            width: indicatorStyle.width,
            left: indicatorStyle.left,
          }"
        />
      </div>

      <div class="flex items-center gap-4">
        <a href="https://aneesh-sharma.me" target="_blank" rel="noopener noreferrer" class="font-label text-sm font-bold tracking-[0.05em] text-primary transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(85,221,173,0.8)]">
          Aneesh
        </a>
      </div>
    </div>
  </nav>
</template>
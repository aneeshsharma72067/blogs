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

const posts: HomePost[] = [
  {
    id: '042',
    essayLabel: 'Essay No. 042',
    published: 'Published Nov 2024',
    title: 'The Silent Architecture of Midnight',
    featured: true,
    paragraphs: [
      'In the quietude of the third hour, the world breathes differently. The digital noise that consumes our daylight hours retreats, leaving behind a vacuum that only thought can fill. We often mistake silence for an absence, but in reality, it is a structure.',
      'Architecture is not just about stone and glass; it is about how we inhabit space. When the sun disappears, the physical space of our rooms shrinks, and the mental space of our consciousness expands to fill the void. This is where the manuscript begins - not with a pen, but with the realization that we are finally alone.',
      'To write at night is to build a cathedral in the dark. Every sentence is a beam of light, every paragraph a corridor. We move through these spaces with a reverence that the daylight rarely permits.',
    ],
    quote: 'Silence is not the absence of sound, but the presence of focus. It is the inkwell from which all meaningful architecture is drawn.',
  },
  {
    id: '041',
    essayLabel: 'Essay No. 041',
    published: 'Published Oct 2024',
    title: 'On the Persistence of Analog Memory',
    paragraphs: [
      'We are living in an era of digital evaporation. Our photos live in clouds, our letters are transient packets of data, and our memories are indexed by algorithms. Yet, there remains a primal urge for the physical - for the grain of paper, the smudge of ink, and the weight of a bound book.',
      'The digital screen offers us infinite possibilities, but it lacks the friction required for true retention. Friction is where meaning is made. When a pen moves across paper, the resistance creates a tactile anchor for the thought. Without that physical anchor, ideas often drift away as quickly as they arrived.',
      'As we move further into the ephemeral, the nocturnal manuscript becomes a protest. It is an attempt to reclaim the permanence of thought, even if the medium remains digital. We style our screens to mimic the depth of parchment and the gravity of leaded type.',
    ],
  },
  {
    id: '040',
    essayLabel: 'Essay No. 040',
    published: 'Published Sep 2024',
    title: 'The Luxury of Negative Space',
    paragraphs: [
      'In modern design, we are taught to fear the empty. We fill every pixel with a call to action, a navigation link, or a suggested article. We have forgotten that the most luxurious thing an interface can provide is the freedom to look away.',
      "Negative space is the breath of the layout. It provides the pause required for digestion. In an age of information density, the act of deliberately leaving a canvas empty is a radical act of hospitality for the reader's attention.",
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-background text-on-background">
    <AppHeader />
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
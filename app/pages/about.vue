<script setup lang="ts">
import AppFooter from '../../components/site/AppFooter.vue'
import AppHeader from '../../components/site/AppHeader.vue'

useHead({
  title: 'Manuscript - About',
  meta: [{ name: 'description', content: 'About The Nocturnal Manuscript and its design philosophy.' }],
})

const themes = ['Digital Asceticism', 'Brutalist Typography', 'The Void as Content']

const principles = [
  {
    icon: 'auto_awesome',
    title: 'Clarity over Complexity',
    description: 'Reducing every interface to its absolute semantic essence.',
  },
  {
    icon: 'dark_mode',
    title: 'Nocturnal Comfort',
    description: 'Designing for the low-light hours when focus is most intense.',
  },
]
</script>

<template>
  <div class="min-h-screen bg-background text-on-background">
    <AppHeader active="about" />

    <main class="pb-20 pt-32">
      <section class="mx-auto mb-32 max-w-7xl px-6 sm:px-8">
        <div class="grid grid-cols-1 items-end gap-16 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <span class="mb-6 block font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              The Philosophy
            </span>
            <h1 class="font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-7xl">
              Cultivating the <span class="italic text-primary">Nocturnal</span> Mind in a Digital Age.
            </h1>
          </div>

          <div class="hidden lg:col-span-4 lg:block">
            <p class="border-l border-outline-variant/30 pl-6 font-label text-xs uppercase tracking-widest leading-loose text-outline">
              An exploration of quietude, deep work, and the aesthetics of written thought.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-12">
        <aside class="hidden lg:col-span-3 lg:block">
          <div class="sticky top-32 flex flex-col gap-12">
            <div class="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-low">
              <img
                src="/stitch/about-author-portrait.jpg"
                alt="Portrait of the author"
                class="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              >
            </div>

            <div>
              <h3 class="mb-2 font-headline font-bold text-on-surface">Elias Thorne</h3>
              <p class="font-label text-[11px] uppercase tracking-widest text-outline">Author & Designer</p>
            </div>

            <div class="space-y-4">
              <div class="font-label text-[11px] font-bold uppercase tracking-widest text-primary">Current Themes</div>
              <ul class="space-y-2 font-body text-sm italic text-on-surface-variant">
                <li v-for="theme in themes" :key="theme">{{ theme }}</li>
              </ul>
            </div>
          </div>
        </aside>

        <article class="max-w-2xl lg:col-span-9">
          <div class="space-y-12 text-lg leading-relaxed text-on-surface/90">
            <p class="font-body">
              In an era defined by the frantic pulse of notifications and the ceaseless churn of the feed,
              <span class="font-bold text-on-surface"> The Nocturnal Manuscript </span>
              is a rebellion. It is a space designed for the slow, the deliberate, and the deep.
            </p>

            <div class="my-16 rounded-r-xl border-l-4 border-primary bg-primary-container/10 p-12">
              <h2 class="mb-4 font-headline text-xl font-bold text-primary">The core thesis is simple:</h2>
              <p class="font-body text-xl italic leading-relaxed text-on-secondary-container">
                "The quality of our attention determines the quality of our reality. When we trade focus for speed, we lose the texture of our own existence."
              </p>
            </div>

            <p class="font-body">
              Writing here is not about the latest or the trending. It is an exercise in suspended ink. I believe that digital platforms should feel less like billboards and more like libraries where the architecture recedes to honor the internal monologue.
            </p>

            <h3 class="pt-8 font-headline text-3xl font-bold text-on-surface">Principles of Design</h3>

            <p class="font-body">
              I approach the interface with a no-line rule. Boundaries should not be enforced by rigid strokes but felt through tonal shifts and the weight of negative space. We use
              <span class="px-1 font-headline text-xs font-bold uppercase tracking-widest text-primary">Manrope</span>
              for the skeletal structure and
              <span class="font-body italic text-on-surface">Noto Serif</span>
              for the blood of the page.
            </p>

            <div class="my-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div
                v-for="principle in principles"
                :key="principle.title"
                class="group rounded-xl bg-surface-container-low p-8 transition-colors hover:bg-surface-container-high"
              >
                <span class="material-symbols-outlined mb-4 block text-primary">{{ principle.icon }}</span>
                <h4 class="mb-3 font-headline font-bold transition-colors group-hover:text-primary">{{ principle.title }}</h4>
                <p class="font-body text-sm leading-relaxed text-on-surface-variant">{{ principle.description }}</p>
              </div>
            </div>

            <p class="font-body">
              This manuscript is a living artifact. It evolves as I find new ways to articulate the quiet struggle for meaning in a loud world. Thank you for being here, in the stillness.
            </p>

            <div class="flex items-center gap-6 border-t border-outline-variant/10 pt-12">
              <NuxtLink
                to="/"
                class="rounded-md bg-linear-to-br from-primary to-primary-container px-8 py-3 font-label text-xs font-bold uppercase tracking-widest text-on-primary transition-transform hover:scale-[0.98]"
              >
                Read the Essays
              </NuxtLink>

              <button type="button" class="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-widest text-primary transition-transform hover:translate-x-2">
                Connect via RSS
                <span class="material-symbols-outlined text-sm">rss_feed</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      <section class="relative mt-32 h-153.5 w-full overflow-hidden bg-surface-container-lowest">
        <div class="absolute inset-0 z-10 bg-linear-to-t from-surface via-transparent to-surface" />
        <img src="/stitch/about-ink-texture.jpg" alt="Deep ink texture" class="h-full w-full object-cover brightness-50 contrast-125">
        <div class="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span class="select-none font-headline text-8xl font-black uppercase tracking-[0.5em] text-primary/5">Silence</span>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
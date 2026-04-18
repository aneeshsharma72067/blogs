<script setup lang="ts">
import AppFooter from '../../components/site/AppFooter.vue'
import AppHeader from '../../components/site/AppHeader.vue'

useHead({
  title: 'Manuscript - About',
  meta: [{ name: 'description', content: 'About The Nocturnal Manuscript and its design philosophy.' }],
})

const themes = ['Systems Thinking', 'Concurrency & Go', 'The Craft of Code']

const principles = [
  {
    icon: 'auto_awesome',
    title: 'Depth over Velocity',
    description: 'Understanding something slowly is faster than misunderstanding it quickly.',
  },
  {
    icon: 'dark_mode',
    title: 'Work Across the Stack',
    description: "The best systems are built by people who've felt the weight of every layer they depend on.",
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
              THE PERSON
            </span>
            <h1 class="font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-7xl">
              Learning to Build in a <span class="italic text-primary">World That Rewards Speed.</span>
            </h1>
          </div>

          <div class="hidden lg:col-span-4 lg:block">
            <p class="border-l border-outline-variant/30 pl-6 font-label text-xs uppercase tracking-widest leading-loose text-outline">
              A RECORD OF QUESTIONS ASKED, SYSTEMS BROKEN, AND THE SLOW ACCUMULATION OF CRAFT.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-12">
        <aside class="hidden lg:col-span-3 lg:block">
          <div class="sticky top-32 flex flex-col gap-12">
            <div class="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-low">
              <img
                src="../assets/images/author.png"
                alt="Portrait of the author"
                class="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              >
            </div>

            <div>
              <h3 class="mb-2 font-headline font-bold text-on-surface">Aneesh Sharma</h3>
              <p class="font-label text-[11px] uppercase tracking-widest text-outline">BUILDER IN PROGRESS</p>
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
              In an industry obsessed with titles, I find myself without a clean one, and I've stopped looking. <span class="font-bold text-on-surface">Aneesh Sharma</span>  is early in a career that doesn't yet have edges. Backend systems, frontend interfaces, design, architecture: I move between them not out of confusion, but out of genuine curiosity about how things fit together.
              
            </p>

            <div class="my-16 rounded-r-xl border-l-4 border-primary bg-primary-container/10 p-12">
              <h2 class="mb-4 font-headline text-xl font-bold text-primary">The honest thesis is this:</h2>
              <p class="font-body text-xl italic leading-relaxed text-on-secondary-container">
                "I don't know what kind of engineer I'll be in ten years. But I know I want to understand, deeply, carefully, not just how to ship, but why the abstractions we reach for are the ones we do."
              </p>
            </div>

            <p class="font-body">
              Writing here is not about tutorials or trending frameworks. It is an act of thinking in public. I believe the best way to understand a concurrency model, a design pattern, or an architectural tradeoff is to try to explain it, and to sit with the discomfort of realizing you can't yet. That gap is where the real learning is.
            </p>

            <h3 class="pt-8 font-headline text-3xl font-bold text-on-surface">Principles of Work</h3>

            <p class="font-body">
              I approach software the way others approach language, with a suspicion of cleverness and a preference for clarity. The right abstraction is not the one that shows off what's possible, but the one that makes the next person's job obvious. I reach for <span class="px-1 font-headline text-xs font-bold uppercase tracking-widest text-primary">Go</span> when I want to think about structure. I reach for the browser when I want to think about people.              
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
              This blog is a living document of a mind still being made. It will change as I do. If something here made you think differently about a problem, or made you feel less alone in not knowing, then it worked. Thank you for reading slowly.
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

    </main>

    <AppFooter />
  </div>
</template>
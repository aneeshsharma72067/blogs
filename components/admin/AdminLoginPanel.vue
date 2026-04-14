<script setup lang="ts">
const username = ref('')
const password = ref('')

const handleSubmit = () => {
  // Placeholder action until backend auth is connected.
  console.info('Authenticate request', { username: username.value, hasPassword: Boolean(password.value) })
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="mb-12 text-center md:text-left">
      <h1 class="mb-2 font-headline text-3xl font-black tracking-tighter text-on-surface">Manuscript</h1>
      <div class="mb-6 h-1 w-12 bg-primary" />
      <p class="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Secure Portal</p>
    </div>

    <div class="rounded-xl bg-surface-container-low p-8 md:p-12">
      <form class="space-y-10" @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div class="group relative">
            <label
              for="username"
              class="mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-outline transition-colors group-focus-within:text-primary"
            >
              Username
            </label>
            <div class="relative flex items-center border-b-2 border-outline-variant/80 py-3 transition-all duration-300 group-focus-within:border-primary group-focus-within:[box-shadow:0_8px_18px_-14px_rgba(85,221,173,0.95)]">
              <input
                id="username"
                v-model="username"
                name="username"
                type="text"
                required
                placeholder="Enter identifier"
                class="w-full bg-transparent py-0 pr-8 font-headline text-sm tracking-wide text-on-surface placeholder:text-outline-variant/80 outline-none transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
              <span class="material-symbols-outlined absolute right-0 text-outline-variant group-focus-within:text-primary">person</span>
            </div>
          </div>

          <div class="group relative">
            <label
              for="password"
              class="mb-2 block font-label text-[10px] font-bold uppercase tracking-widest text-outline transition-colors group-focus-within:text-primary"
            >
              Password
            </label>
            <div class="relative flex items-center border-b-2 border-outline-variant/80 py-3 transition-all duration-300 group-focus-within:border-primary group-focus-within:[box-shadow:0_8px_18px_-14px_rgba(85,221,173,0.95)]">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full bg-transparent py-0 pr-8 font-headline text-sm tracking-wide text-on-surface placeholder:text-outline-variant/80 outline-none transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
              <span class="material-symbols-outlined absolute right-0 text-outline-variant group-focus-within:text-primary">lock</span>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container py-4 font-headline font-bold text-on-primary transition-all duration-300 hover:bg-primary active:scale-[0.98]"
          >
            <span class="text-[12px] uppercase tracking-widest">Authenticate Access</span>
            <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <a href="#" class="font-body text-sm italic text-outline transition-colors hover:text-primary">Forgot credentials?</a>
          <div class="flex items-center gap-2 font-headline text-[10px] uppercase tracking-tight text-outline-variant">
            <span class="material-symbols-outlined text-sm">verified_user</span>
            256-bit Encryption
          </div>
        </div>
      </form>
    </div>

    <div class="mt-12 text-center">
      <p class="font-body text-sm italic text-on-surface/70">The Nocturnal Manuscript - Administrative Node 01</p>
    </div>
  </div>
</template>
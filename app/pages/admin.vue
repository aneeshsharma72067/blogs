<script setup lang="ts">
import AdminLoginPanel from '../../components/admin/AdminLoginPanel.vue'

useHead({
  title: 'Manuscript | Secure Admin Login',
  meta: [{ name: 'description', content: 'Secure admin portal for The Nocturnal Manuscript.' }],
})
</script>

<template>
  <div class="bg-surface w-full min-h-screen text-on-background">
    <main class="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <div class="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div class="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary-container/5 blur-3xl" />

      <div class="z-10 w-full flex items-center justify-center">
        <AdminLoginPanel />
      </div>
    </main>

    <footer class="w-full border-t border-primary/5 bg-surface-container-lowest py-12">
      <div class="flex flex-col items-center gap-4">
        <p class="font-body text-sm italic text-on-surface/50">© 2024 The Nocturnal Manuscript. All rights reserved.</p>
        <div class="flex gap-8">
          <a href="#" class="font-body text-xs text-on-surface/50 transition-colors hover:text-primary">Privacy Policy</a>
          <a href="#" class="font-body text-xs text-on-surface/50 transition-colors hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  runtimeConfig: {
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'root',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || 'replace-this-secret-in-env',
  },
  vite:{
    plugins: [tailwindcss()]
  }
})

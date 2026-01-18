// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-18',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', // Global state management
    '@nuxtjs/tailwindcss' // Tailwind CSS
  ],

  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001' // Backend NestJS 
    }
  }
})
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL ?? '',
      apiToken: process.env.API_TOKEN,
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  css: ['~~/assets/styles/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~~/assets/styles/variable.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
        },
      ],
    },
  },
})

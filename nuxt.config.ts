// https://v3.nuxtjs.org/api/configuration/nuxt.config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v6.2.0/css/all.css" }
      ]
    },
  },
  buildModules: [
    '@nuxtjs/pwa',
  ],
  css: [
    '@/assets/scss/index.scss'
  ],
  modules: [
    '@pinia/nuxt',
  ],

  vite: {
    plugins: [
      svgLoader({})
    ]
  }
})



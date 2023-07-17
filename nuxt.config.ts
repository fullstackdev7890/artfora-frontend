// https://v3.nuxtjs.org/api/configuration/nuxt.config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      MTCAPTCHA_SITE_KEY: process.env.MTCAPTCHA_SITE_KEY,
      GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v6.2.0/css/all.css" }
      ],
      script: [
        {
          src:
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyB3zhcWhQh_reibqWWsEXc6yl6ZI26enO8&libraries=places`,
          defer: true,
        },
      ],
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
  },
  router: {
    options: {
      linkActiveClass: 'categories-body-item-active'
    }
  },

})



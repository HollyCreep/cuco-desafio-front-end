import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: 'CUCOHealth - %s',
    title: 'CUCOHealth',
    htmlAttrs: {
      lang: 'pt',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/services.ts',
    '~/plugins/i18n.ts',
    '~/plugins/vee-validate.ts',
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', 'nuxt-compress'],

  modules: ['@nuxtjs/axios', '@nuxtjs/i18n', 'nuxt-brotli'],


  build: {},

  publicRuntimeConfig: {
    axios: {
      apiURL: 'http://localhost:3003',
    },
  },

  axios: {
    baseURL: '/',
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.ts',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.ts',
        name: 'English',
      },
      {
        code: 'es',
        file: 'es.ts',
        name: 'Español',
      },
      {
        code: 'pt',
        file: 'pt.ts',
        name: 'Português',
      },
    ],
    defaultLocale: 'pt',
    langDir: '~locales/',
    vueI18n: {
      fallbackLocale: 'pt',
      silentTranslationWarn: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
    },
  },
}

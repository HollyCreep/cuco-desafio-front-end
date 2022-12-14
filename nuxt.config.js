export default {
  ssr: false,

  target: 'static',

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

  css: ['~/assets/scss/main.scss'],

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/services.ts',
    '~/plugins/i18n.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/vue-the-mask.ts',
  ],

  components: {
    dirs: [
      '~/components',
      '~/components/base',
      '~/components/inputs',
    ],
  },

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', 'nuxt-compress', '@nuxtjs/google-fonts'],

  modules: ['@nuxtjs/axios', '@nuxtjs/i18n', 'vue-toastification/nuxt', 'nuxt-brotli'],

  build: {},

  router: {
    middleware: ['handleRouteMeta', 'localeValidation'],
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/vuetify/-variables.scss'],
    defaultAssets: {
      font: false,
      icons: 'mdiSvg',
    },
    optionsPath: '~/plugins/vuetify.ts',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.ts',
        name: 'English',
        flag: 'united_states',
      },
      {
        code: 'es',
        file: 'es.ts',
        name: 'Español',
        flag: 'spain',
      },
      {
        code: 'pt',
        file: 'pt.ts',
        name: 'Português',
        flag: 'brasil',
      },
    ],
    defaultLocale: 'pt',
    langDir: '~locales/',
    vueI18n: {
      fallbackLocale: 'pt',
      silentTranslationWarn: true,
    },
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root',
    },
  },

  googleFonts: {
    families: {
      Inter: {
        wght: [400, 500, 600],
        ital: [],
      },
      Poppins: {
        wght: [400, 600],
        ital: [],
      },
      Roboto: {
        wght: [700],
        ital: [],
      },

    },
  },
}

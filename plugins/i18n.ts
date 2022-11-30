import { Plugin } from '@nuxt/types'
// import { Mutations } from '~/store/-types'

const i18n: Plugin = ({ app, store, $vuetify }) => {
  $vuetify.lang.current = app.i18n.localeProperties.code

  app.i18n.onBeforeLanguageSwitch = (_oldLocale, newLocale) => {
    $vuetify.lang.current = newLocale
    // store.commit(Mutations.SET_LOCALE, newLocale)
  }
}

export default i18n

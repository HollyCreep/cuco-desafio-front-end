import { Context } from '@nuxt/types'

const Vuetify = ({ store }: Context) => {
  const themes = store.getters['theme/getTheme']

  return {
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes,
    },
  }
}

export default Vuetify

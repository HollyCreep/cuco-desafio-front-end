import { Context } from '@nuxt/types'
import Mutations from '~/store/-mutations'

export default function ({ store, route }: Context) {
  const { locale } = store.state
  const { name } = route

  if (locale && name && !name.includes(locale)) {
    const [_path, newLocale] = name.split('___')
    store.commit(Mutations.SET_LOCALE, newLocale)
  }
}

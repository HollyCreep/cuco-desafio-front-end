import { Context } from '@nuxt/types'
import Actions from '~/store/-actions'

export default function ({ store, route, app }: Context) {
  const { meta } = route

  if (meta && Array.isArray(meta)) {
    const pageMeta = meta.find((i) => i.config)

    if (!pageMeta) return true
    store.dispatch(Actions.SET_ROUTE_CONFIG, {
      ...pageMeta.config,
      ...(pageMeta.config.name && { name: app.i18n.tc(pageMeta.config.name) }),
    })
  }
}

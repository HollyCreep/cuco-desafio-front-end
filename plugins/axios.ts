import { Plugin } from '@nuxt/types'
import { AxiosError } from 'axios'
import Mutations from '~/store/-mutations'

const axios: Plugin = ({ $toast, $axios, $config, store, i18n }) => {
  $axios.onRequest(() => store.commit(Mutations.SET_LOADING, true))
  $axios.onResponse(() => store.commit(Mutations.SET_LOADING, false))
  $axios.onError(() => store.commit(Mutations.SET_LOADING, false))
  $axios.onRequestError(() => store.commit(Mutations.SET_LOADING, false))

  $axios.onResponseError((error: AxiosError) => {
    let message = error?.response?.data
    const code = error?.response && error?.response?.status

    if (code === 400) {
      message = i18n.t(`errors.${code}`) as string
    }
    message && typeof message === 'string' && $toast.error(message)
    return Promise.resolve(false)
  })
}

export default axios

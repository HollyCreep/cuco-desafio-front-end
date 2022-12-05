import { Plugin } from '@nuxt/types'
import { AxiosError } from 'axios'

const axios: Plugin = ({ $toast, $axios, $config, store, i18n }) => {
  $axios.onResponseError((error: AxiosError) => {
    let message = error?.response?.data
    const code = error?.response && error?.response?.status

    if (code === 400) {
      message = i18n.t(`errors.${code}`) as string
    }
    message && $toast.error(message)
    return Promise.resolve(false)
  })
}

export default axios

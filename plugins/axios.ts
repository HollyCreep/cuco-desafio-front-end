import { Plugin } from '@nuxt/types'
import { AxiosError } from 'axios'
import { ApiResponse, ApiError400ResponseDTO } from '~/services/HttpService'

const axios: Plugin = ({ $toast, $axios, $config, store, i18n }) => {
  $axios.onRequest((_config) => {
    const token = store.getters.token
    token
      ? $axios.setToken(token, 'Bearer')
      : $axios.setToken($config.basicToken)
  })

  $axios.onResponseError((error: AxiosError) => {
    const code = error?.response && error?.response?.status
    const res = error?.response?.data as ApiResponse
    let message =
      (res as ApiError400ResponseDTO)?.message || (res as string) || ''
    if (code === 400) {
      message = i18n.t(`errors.${code}`) as string
    }
    message && $toast.error(message)
    return Promise.resolve(false)
  })
}

export default axios

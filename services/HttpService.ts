import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export type ApiError400ResponseDTO = {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

export type ApiResponse = ApiError400ResponseDTO | string

export interface SendEmailParams {
  sendto: string
  from: string
  assunto: string
  bodyhtml: string
}

type SendEmailRequest = (params: SendEmailParams) => Promise<ApiResponse>

export default class HttpService {
  private axios: NuxtAxiosInstance
  private config: NuxtRuntimeConfig

  constructor($axios: NuxtAxiosInstance, $config: NuxtRuntimeConfig) {
    this.axios = $axios
    this.config = $config
  }

  sendEmail: SendEmailRequest = (params) => {
    const data = new FormData()
    Object.entries(params).forEach(([key, val]) => {
      data.append(key, val)
    })
    return this.axios.$post('/api-mensagem/1.0/email/sendEmail', data)
  }
}

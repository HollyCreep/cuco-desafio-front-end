import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'

type TokenDTO = {
  access_token: string
  scope: string
  token_type: string
  expires_in: number
}

type IGenerateToken = () => Promise<TokenDTO>

export default class AuthService {
  private axios: NuxtAxiosInstance
  private config: NuxtRuntimeConfig

  constructor($axios: NuxtAxiosInstance, $config: NuxtRuntimeConfig) {
    this.axios = $axios
    this.config = $config
  }

  generateToken: IGenerateToken = () => {
    const urlencoded = new URLSearchParams()
    urlencoded.append('grant_type', 'client_credentials')
    return this.axios.$post('/token', urlencoded, {
      headers: { Authorization: `Basic ${this.config.basicToken}` },
    })
  }
}

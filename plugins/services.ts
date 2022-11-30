import { Plugin } from '@nuxt/types'
import HttpService from '@/services/HttpService'

const services: Plugin = ({ $axios, $config }, inject) => {
  const Http = new HttpService($axios, $config)

  inject('http', Http)
}

export default services

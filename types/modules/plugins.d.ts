// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '@nuxt/types'
import ToastInterface from 'vue-toastification/dist/types/src/ts/interface'
import HttpService from '~/services/HttpService'

export type IHTTP = InstanceType<typeof HttpService>

declare module 'vue/types/vue' {
  interface Vue {
    $http: IHTTP
  }
}

declare module '@nuxt/types' {
  interface Context {
    $http: IHTTP
    $toast: ReturnType<typeof ToastInterface>
  }
}

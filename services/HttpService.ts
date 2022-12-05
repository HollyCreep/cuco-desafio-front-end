import { AxiosResponse } from 'axios'
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ICustomer, INewCustomer } from '~/types/interfaces'

type APIResponseHeaders = {
  'cache-control': string
  'content-type': string
  expires: string
  link: string
  pragma: string
  'x-total-count': string
}
interface GetCustomersResponse extends AxiosResponse<ICustomer[]> {
  headers: APIResponseHeaders
}
type GetCustomersRequest = (
  params?: Record<string, string | number>
) => Promise<GetCustomersResponse>

type CreateCustomerRequest = (customer: INewCustomer) => Promise<ICustomer>
type UpdateCustomerRequest = (customer: ICustomer) => Promise<ICustomer>

type PatchCustomerRequest = (
  customer: Partial<ICustomer> & { id: string }
) => Promise<ICustomer>

export default class HttpService {
  private axios: NuxtAxiosInstance
  private config: NuxtRuntimeConfig

  constructor($axios: NuxtAxiosInstance, $config: NuxtRuntimeConfig) {
    this.axios = $axios
    this.config = $config
  }

  getCustomers: GetCustomersRequest = (params) => {
    return this.axios.get('clients', { params })
  }

  getCustomerByID = (id: string | number): Promise<ICustomer | {}> => {
    return this.axios.$get(`clients/${id}`)
  }

  createCustomer: CreateCustomerRequest = (customer) => {
    return this.axios.$post(`clients`, customer)
  }

  updateCustomer: UpdateCustomerRequest = ({ id, ...props }) => {
    return this.axios.$put(`clients/${id}`, props)
  }

  updateCustomerPartial: PatchCustomerRequest = ({ id, ...props }) => {
    return this.axios.$patch(`clients/${id}`, props)
  }
}

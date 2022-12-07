<template>
  <FormCustomer :customer="customer" />
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'
import { IRouteMetaConfig } from '~/types/interfaces'

@Component({
  nuxtI18n: {
    paths: {
      en: '/edit/:id',
      es: '/editar/:id',
      pt: '/editar/:id',
    },
  },
  meta: {
    config: {
      name: 'e.edit_customer',
    } as IRouteMetaConfig,
  },
  async asyncData({ params, $http }) {
    const id = params.id
    const customer = await $http.getCustomerByID(id)
    return { customer }
  },
})
export default class Home extends Page {
  head = {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Editar Cliente',
      },
    ],
  }

  customRoutePath = {
    en: '/edit/:id',
    es: '/editar/:id',
    pt: '/editar/:id',
  }
}
</script>

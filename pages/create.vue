<template>
  <FormCustomer />
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'
import { IRouteMetaConfig } from '~/types/interfaces'

@Component({
  nuxtI18n: {
    paths: {
      en: '/new',
      es: '/nuevo',
      pt: '/novo',
    },
  },
  meta: {
    config: {
      name: 'n.new_customer',
    } as IRouteMetaConfig,
  },
})
export default class CreateCustomerPage extends Page {
  head = {
    meta: [
      {
        hid: 'description',
        name: 'Novo Cliente',
        content: 'My custom description',
      },
    ],
  }

  customRoutePath = {
    en: '/new',
    es: '/nuevo',
    pt: '/novo',
  }
}
</script>

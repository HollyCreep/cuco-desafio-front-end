<template>
  <v-data-iterator
    class="ch-customers-list"
    :items="items"
    :items-per-page.sync="params._limit"
    :page.sync="params._page"
    :server-items-length="totalCountItems"
    hide-default-footer
  >
    <template v-slot:header>
      <v-text-field
        v-model="search"
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="font-inter body-1 font-weight-regular"
        label="Digite aqui um nome ou CPF"
        filled
        single-line
        solo
        background-color="white"
      ></v-text-field>
    </template>

    <template v-slot:default="{items}">
      <FancyList :items="items" />
    </template>

    <template v-slot:footer>
      <v-row class="mt-2" align="center" justify="center">
        <span class="mr-4 grey--text">Página {{ params._page }} of {{ numberOfPages }}</span>
        <v-spacer />
        <v-pagination
          v-model="params._page"
          :length="numberOfPages"
          :total-visible="5"
          @next="getCustomers"
          @previous="getCustomers"
          previous-aria-label="false"
        ></v-pagination>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'
import { ICustomer, IRouteMetaConfig } from '~/types/interfaces'

@Component<Home>({
  meta: {
    config: {
      name: 'c.customer',
      showButton: true,
    } as IRouteMetaConfig,
  },
  async fetch() {
    this.getCustomers()
  },
})
export default class Home extends Page {
  head = {
    meta: [
      {
        hid: 'description',
        name: 'Clientes',
        content: 'My custom description',
      },
    ],
  }

  customRoutePath = {
    en: '/',
    es: '/',
    pt: '/',
  }

  params = {
    _page: 1,
    _limit: 5,
  }
  totalCountItems = 0
  search = ''
  loading = true
  items: ICustomer[] = []

  async getCustomers() {
    this.loading = true
    const { data, headers } = await this.$http.getCustomers(this.params)
    this.loading = false
    this.items = data
    this.totalCountItems = Number(headers['x-total-count'])
  }

  get numberOfPages() {
    return Math.ceil(this.totalCountItems / this.params._limit)
  }

  nextPage() {
    if (this.params._page + 1 <= this.numberOfPages) this.params._page += 1
  }
  previousPage() {
    if (this.params._page - 1 >= 1) this.params._page -= 1
  }
}
</script>

<style lang="scss" scoped>
.ch-customers-list {
  :deep(.v-pagination) {
    li button:not(.pagination__item--active) {
      box-shadow: initial;
      background: var(--v-background-base);
    }
  }
}
</style>

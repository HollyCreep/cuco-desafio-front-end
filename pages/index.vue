<template>
  <v-data-iterator
    class="ch-customers-list"
    :items="items"
    :items-per-page.sync="params._limit"
    :page.sync="params._page"
    :server-items-length="totalCountItems"
    hide-default-footer
  >
    <template #header>
      <v-text-field
        v-model="search"
        clearable
        hide-details
        :append-icon="mdiMagnify"
        class="font-inter body-1 font-weight-regular mb-10"
        label="Digite aqui um nome ou CPF"
        filled
        single-line
        solo
        background-color="white"
        :loading="loading"
        @input="handleSearch"
      ></v-text-field>
    </template>

    <template #default="{items}">
      <FancyList :items="items" />
    </template>

    <template #footer="{pagination: {pageStart, pageStop, itemsLength}}">
      <div class="d-flex align-center mt-2" v-if="items.length">
        <span class="body--text text-body-2">{{pageStart + 1}} - {{pageStop}} de {{itemsLength}}</span>
        <v-spacer />
        <v-pagination
          v-model="params._page"
          :length="numberOfPages"
          :total-visible="5"
          @input="getCustomers"
        ></v-pagination>
      </div>
    </template>
    <template #no-data>
      <v-layout row justify-center v-show="!loading">
        <p class="text-body">Não foram encontrados nenhum registro para a busca atual.</p>
      </v-layout>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'
import { ICustomer, IRouteMetaConfig } from '~/types/interfaces'
import { mdiMagnify } from '@mdi/js'
import { mixins } from 'vue-class-component'
import { Masker } from '~/utils/mixins'

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
export default class Home extends mixins(Page, Masker) {
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

  params: Record<string, number | string> = {
    _page: 1,
    _limit: 5,
  }
  totalCountItems = 0
  search = ''
  loading = false
  delayTimer!: ReturnType<typeof setTimeout>
  items: ICustomer[] = []
  mdiMagnify = mdiMagnify
  BrV = require('br-validations')

  async getCustomers() {
    this.loading = true
    const { data, headers } = await this.$http.getCustomers(this.params)
    this.loading = false
    this.items = data
    this.totalCountItems = Number(headers['x-total-count'])
  }

  get numberOfPages() {
    return Math.ceil(this.totalCountItems / Number(this.params._limit))
  }

  async handleSearch() {
    clearTimeout(this.delayTimer)

    this.delayTimer = setTimeout(() => {
      this.addRequestParams()
      this.getCustomers()
    }, 500)
  }

  addRequestParams() {
    delete this.params.name_like
    delete this.params.cpf_like
    if (!this.search) return

    this.params = {
      ...this.params,
      ...(this.BrV.cpf.validate(this.search) |
      this.BrV.cnpj.validate(this.search)
        ? {
            cpf_like: this.masker(this.search, [
              '###.###.###-##',
              '##.###.###/####-##',
            ]),
          }
        : {
            name_like: this.search,
          }),
    }
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

<template>
  <section>
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
          single-line
          solo
          @input="handleSearch"
        ></v-text-field>
      </template>

      <template #default="{items}">
        <FancyList ref="fancy-list" :items="items" @delete="handleDelete" />
      </template>

      <template #footer="{pagination: {pageStart, pageStop, itemsLength}}">
        <div class="d-flex align-center mt-4" v-if="items.length">
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
        <v-layout row justify-center v-show="!$fetch.pending">
          <p class="text-body" v-text="$t('messages.no_data')"></p>
        </v-layout>
      </template>
    </v-data-iterator>

    <v-dialog v-model="openModal" width="400" persistent>
      <v-card class="text-center pa-6">
        <v-avatar size="48" color="warning">
          <v-icon color="warning darken-1" size="20">{{mdiAlert}}</v-icon>
        </v-avatar>
        <v-card-title
          class="justify-center font-inter text-subtitle-1 font-weight-500"
        >{{$t('c.caution')}}</v-card-title>

        <v-card-text>{{$t('messages.delete_confirm')}}</v-card-text>

        <v-card-actions>
          <v-btn class="flex-grow-1" color="body" text @click="closeModal">{{$t('c.cancel')}}</v-btn>
          <v-btn class="flex-grow-1" color="error" @click="deleteCustomers">{{$t('d.delete')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'
import { ICustomer, IRouteMetaConfig } from '~/types/interfaces'
import { mdiAlert, mdiMagnify } from '@mdi/js'
import { mixins } from 'vue-class-component'
import { Masker } from '~/utils/mixins'
import FancyList from '~/components/FancyList/index.vue'

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
  /* --------------------------------- Imports -------------------------------- */
  BrV = require('br-validations')
  mdiMagnify = mdiMagnify
  mdiAlert = mdiAlert

  /* ---------------------------- Abstract required --------------------------- */
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

  /* ---------------------------- Type Declaration ---------------------------- */
  $refs!: {
    'fancy-list': FancyList
  }
  delayTimer!: ReturnType<typeof setTimeout>

  /* ------------------------------- Pagination ------------------------------- */
  params: Record<string, number | string> = {
    _page: 1,
    _limit: 5,
  }
  totalCountItems = 0
  search = ''

  /* ---------------------------------- State --------------------------------- */
  openModal = false
  items: ICustomer[] = []
  deleteIds: string[] = []

  get numberOfPages() {
    return Math.ceil(this.totalCountItems / Number(this.params._limit))
  }

  /* -------------------------------- Requests -------------------------------- */

  async getCustomers() {
    const { data, headers } = await this.$http.getCustomers(this.params)
    this.items = data
    this.totalCountItems = Number(headers['x-total-count'])
  }

  async deleteCustomers() {
    const response = await this.$http.batchDeleteCustomer(this.deleteIds)

    response.forEach((result, index) => {
      !!result.value
        ? this.$toast.success(
            this.$t('messages.delete', [this.items[index].name])
          )
        : this.$toast.error(this.$t('errors.delete', [this.items[index].name]))
    })

    this.$refs['fancy-list'].resetSelected()
    this.closeModal()
    this.getCustomers()
  }

  /* -------------------------------------------------------------------------- */

  async handleSearch() {
    clearTimeout(this.delayTimer)

    // Prevent multiple requests on typing, adding an interval between calls
    this.delayTimer = setTimeout(() => {
      this.addRequestParams()
      this.getCustomers()
    }, 500)
  }

  handleDelete(ids: string[]) {
    this.deleteIds = ids
    this.openModal = true
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

  closeModal() {
    this.openModal = false
    this.deleteIds = []
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

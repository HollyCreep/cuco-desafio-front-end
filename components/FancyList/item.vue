<template>
  <v-card class="pa-8">
    <v-row class="body--text" no-gutters justify-md="space-between" align="center">
      <v-col cols="auto">
        <v-checkbox
          color="secondary"
          v-model="innerSelected"
          @change="$emit('update:selected', innerSelected)"
          hide-details
          class="py-0 my-0"
        ></v-checkbox>
      </v-col>
      <v-col cols="10" md="4" class="d-flex flex-column">
        <span class="heading--text font-weight-bold">{{customer.name}}</span>
        <span class="text-subtitle-2">{{customer.cpf}}</span>
      </v-col>
      <v-col cols="12" md="3">{{customer.birthdate | formatDate}}</v-col>
      <v-col cols="12" md="2">{{customer.phone}}</v-col>
      <v-col cols="12" md="auto">
        <v-btn
          color="tertiary"
          class="white--text float-end"
          text
          nuxt
          :to="localePath({ name: routes.EDIT_CUSTOMER, params: { id: customer.id }})"
        >
          <v-icon>{{mdiPencil}}</v-icon>
          {{$t('e.edit')}}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { PropType } from 'vue/types/v3-component-props'
import { ICustomer } from '~/types/interfaces'
import { BaseComponent } from '~/utils/classes'
import { mdiPencil } from '@mdi/js'
import moment from 'moment'

@Component({
  filters: {
    formatDate: function (value: string) {
      if (!value) return ''
      return moment(value).locale('pt-BR').format('DD [de] MMMM YYYY')
    },
  },
})
export default class FancyListItem extends BaseComponent {
  @Prop({ type: Object as PropType<ICustomer>, required: true })
  readonly customer!: ICustomer
  @Prop({ type: Boolean })
  readonly selected!: boolean

  innerSelected = false
  mdiPencil = mdiPencil

  @Watch('selected', { immediate: true })
  onSelectChange(val: boolean) {
    this.innerSelected !== val && (this.innerSelected = val)
  }

  toggleSelected(value: boolean) {
    this.innerSelected = value
  }
}
</script>

<style lang="scss" scoped>
</style>

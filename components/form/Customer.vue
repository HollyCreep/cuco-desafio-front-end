<template>
  <validation-observer ref="obs" tag="div">
    <v-form id="form-send-email" v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <TextFieldWithValidation
            v-model="form.name"
            v-bind="default_field_style"
            :label="$t('c.complete_name')"
            :name="$t('c.complete_name')"
            rules="required|min:5"
          ></TextFieldWithValidation>
        </v-col>
        <v-col cols="12" md="6">
          <TextFieldWithValidation
            v-model="form.cpf"
            v-bind="default_field_style"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            label="CPF/CNPJ"
            name="CPF/CNPJ"
            hint="Ex: 123.456.789-01 | 27.865.757/0001-05"
            rules="required|cpf"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextFieldWithValidation
            v-model="form.birthdate"
            v-bind="default_field_style"
            v-mask="['##/##/####']"
            :label="'Data nascimento'"
            :name="'Data nascimento'"
            rules="required|date"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.phone"
            v-bind="default_field_style"
            v-mask="['(##) ####-####', '(##) #####-####']"
            :label="$tc('p.phone')"
            :name="$tc('p.phone')"
            hint="Com DDD e apenas números"
            type="tel"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-layout row justify-end>
      <v-btn class="mr-8 body--text" :disabled="loading" text nuxt to="/">Cancelar</v-btn>
      <v-btn
        color="tertiary"
        class="white--text font-weight-semi-bold"
        :disabled="!valid"
        :loading="loading"
        @click="handleSubmit"
      >Salvar</v-btn>
    </v-layout>
  </validation-observer>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Prop } from 'vue-property-decorator'
import { PropType } from 'vue/types/v3-component-props'
import { ICustomer, INewCustomer } from '~/types/interfaces'
import { BaseForm } from '~/utils/classes'

type IFormCreateCustomer = Partial<ICustomer>

@Component({})
export default class FormCustomer extends BaseForm {
  @Prop({ type: Object as PropType<ICustomer> })
  readonly customer!: ICustomer

  created() {
    if (this.customer) {
      this.form = {
        ...this.customer,
        birthdate: moment(this.customer.birthdate).format('DD/MM/YYYY'),
      }
    }
  }

  loading = false

  form: IFormCreateCustomer = {
    name: undefined,
    cpf: undefined,
    phone: undefined,
    birthdate: undefined,
  }

  default_field_style = {
    'background-color': '#FFF',
    filled: true,
  }

  async submit() {
    const formatedDate = this.formatDate(this.form.birthdate as string)
    if (!formatedDate) return

    this.form.birthdate = formatedDate
    this.loading = true

    this.form.id
      ? await this.$http.updateCustomer(this.form as ICustomer)
      : await this.$http.createCustomer(this.form as INewCustomer)
    this.clear()
    this.loading = false

    this.$toast.success('Cliente editado com sucesso!')
    this.$router.push('/')
  }

  async clear() {
    this.form = {
      name: undefined,
      cpf: undefined,
      phone: undefined,
      birthdate: undefined,
    }

    this.resetValidation()
  }

  formatDate(date: string) {
    let fDate = moment(date, 'DD/MM/YYYY')

    return fDate.isValid() && fDate.format('YYYY-MM-DD')
  }
}
</script>


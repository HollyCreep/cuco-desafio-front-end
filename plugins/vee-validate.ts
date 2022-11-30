// @ts-nocheck
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/pt_BR.json'
const BrV = require('br-validations')

extend('cpf', (value) => {
  if (BrV.cpf.validate(value) | BrV.cnpj.validate(value)) {
    return true
  }
  return 'O valor informado não é um CPF/CNPJ válido'
})

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  })
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

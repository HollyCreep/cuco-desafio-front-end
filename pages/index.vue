<template>
  <h1 class="primary--text">TESTE</h1>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Page } from '@/utils/classes'

@Component({})
export default class Home extends Page {
  head = {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My custom description',
      },
    ],
  }

  customRoutePath = {
    en: '/',
    es: '/',
    pt: '/',
  }
}
</script>

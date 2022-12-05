<template>
  <header class="ch-header py-8 white--text primary">
    <div class="ch-header-content ch-container">
      <v-layout>
        <nuxt-link to="/">
          <v-img :src="require('@/assets/logo.png')" max-height="40" max-width="140" contain></v-img>
        </nuxt-link>

        <v-spacer></v-spacer>

        <v-btn
          color="secondary"
          v-if="showCreateCustomerButton"
          nuxt
          :to="localePath(routes.CREATE_CUSTOMER)"
        >Novo Cliente</v-btn>
      </v-layout>
      <h1 class="text-h1">{{routeFriendlyName}}</h1>
    </div>
  </header>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { BaseComponent } from '~/utils/classes'

@Component({
  computed: {
    ...mapGetters(['routeFriendlyName', 'showCreateCustomerButton']),
  },
})
export default class Header extends BaseComponent {}
</script>

<style lang="scss" scoped>
.ch-header {
  .ch-header-content h1 {
    margin-top: 90px;
  }
}
</style>

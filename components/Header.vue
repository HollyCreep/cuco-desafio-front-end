<template>
  <header class="ch-header py-8 white--text primary">
    <div class="ch-header-content ch-container">
      <v-row align="center" justify="space-between">
        <v-col cols="auto" sm="auto">
          <nuxt-link to="/" aria-label="Company logo">
            <v-img :src="require('@/assets/logo.png')" max-height="40" max-width="140" contain></v-img>
          </nuxt-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col sm="auto">
          <Accessibility />
        </v-col>
        <v-col sm="auto">
          <ToggleThemeButton />
        </v-col>
        <v-col sm="auto">
          <LangSelector />
        </v-col>
        <v-col cols="6" sm="auto" order="last" order-sm="0" class="mt-10 mt-sm-0">
          <v-btn
            color="secondary"
            v-if="showCreateCustomerButton"
            nuxt
            :to="localePath(routes.CREATE_CUSTOMER)"
          >{{$tc('n.new_customer')}}</v-btn>
        </v-col>
        <v-col cols="6" sm="12" class="mt-10 mt-sm-0">
          <h1 class="text-h1">{{routeFriendlyName}}</h1>
        </v-col>
      </v-row>
    </div>
  </header>
</template>

<script lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
import { Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { BaseComponent } from '~/utils/classes'

@Component({
  computed: {
    ...mapGetters(['routeFriendlyName', 'showCreateCustomerButton']),
  },
})
export default class Header extends BaseComponent {
  mdiThemeLightDark = mdiThemeLightDark
}
</script>

<style lang="scss" scoped>
.ch-header {
  .ch-header-content h1 {
    @media screen and (min-width: 600px) {
      margin-top: 90px;
    }
  }
}
</style>

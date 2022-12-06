<template>
  <v-app>
    <Header class="pb-16" />
    <v-main class="background">
      <div class="ch-container fill-height">
        <Nuxt />
      </div>
    </v-main>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['loading']),
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.ch-container {
  transform: translateY(-2rem);
  align-content: flex-start;
  z-index: 2;
}
</style>

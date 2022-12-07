<template>
  <v-app :class="{'ch-g-scale': isGrayScale}">
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
import { mapGetters, mapMutations } from 'vuex'
import Mutations from '~/store/-mutations'

@Component({
  computed: {
    ...mapGetters({
      loading: 'loading',
      isGrayScale: 'accesibility/getGrayScale',
    }),
  },
  methods: {
    ...mapMutations({
      unlockFeatures: Mutations.UNLOCK_FEATURES,
    }),
  },
})
export default class DefaultLayout extends Vue {
  unlockFeatures!: () => void

  created() {
    this.onKonamiCode()
  }
  onKonamiCode() {
    let c = 0
    const kCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    document.addEventListener('keydown', (e) => {
      c =
        e.keyCode == kCode[c]
          ? c + 1
          : e.keyCode - 38
          ? 0
          : c
          ? kCode[c - 1] == 38
            ? c
            : 0
          : 0
      if (c == kCode.length) {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        this.unlockFeatures()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.ch-container {
  transform: translateY(-2rem);
  align-content: flex-start;
  z-index: 2;
}
</style>

<template>
  <v-btn class="toggle-theme" icon @click="toggleTheme" v-if="showAllFeatures">
    <v-img
      width="28"
      height="28"
      class="sun"
      :class="{'active': !$vuetify.theme.dark}"
      :src="require('@/assets/svg/light-theme.svg')"
      contain
    ></v-img>
    <v-img
      width="28"
      height="28"
      class="moon"
      :class="{'active': $vuetify.theme.dark}"
      :src="require('@/assets/svg/dark-theme.svg')"
      contain
    ></v-img>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['showAllFeatures']),
  },
})
export default class ToggleThemeButton extends Vue {
  toggleTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>


<style lang="scss" scoped>
.toggle-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s ease;

  .sun {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease, color 0.5s ease;
    opacity: 0;
    transform: translateX(50px);
    &:not(.active) {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .moon {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease, color 0.5s ease;
    transform: translateX(0px);
    &.active {
      opacity: 0;
      transform: translateX(-50px);
    }
  }
}
</style>

<template>
  <transition name="scroll-x-reverse-transition" mode="out-in">
    <v-btn
      v-if="showAllFeatures && !showItems "
      v-bind="$attrs"
      key="btn"
      text
      icon
      class="d-inline"
      @click="showItems = !showItems"
    >
      <v-icon color="white" size="24">{{mdiAccessibility}}</v-icon>
    </v-btn>
    <div
      v-else-if="showAllFeatures"
      key="list"
      v-click-outside="hideItems"
      class="d-inline-flex px-4"
    >
      <v-btn color="white" fab x-small class="mx-1" depressed @click="handleSetFontPlus">
        <v-icon color="black">{{mdiFormatAnnotationPlus}}</v-icon>
      </v-btn>

      <v-btn color="white" fab x-small class="mx-1" depressed @click="handleSetFontMinus">
        <v-icon color="black">{{mdiFormatAnnotationMinus}}</v-icon>
      </v-btn>

      <v-btn color="white" fab x-small class="mx-1" depressed @click="resetFontSize">
        <v-icon color="black">{{mdiFormatColorText}}</v-icon>
      </v-btn>

      <v-btn color="white" fab x-small class="mx-1" depressed @click="toggleGrayScale">
        <v-icon color="black">{{mdiCircleSlice4}}</v-icon>
      </v-btn>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  mdiFormatAnnotationPlus,
  mdiFormatAnnotationMinus,
  mdiFormatColorText,
  mdiCircleSlice4,
  mdiWheelchairAccessibility,
} from '@mdi/js'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapMutations } from 'vuex'
import Mutations from '~/store/-mutations'

@Component({
  computed: {
    ...mapGetters({
      showAllFeatures: 'showAllFeatures',
      fontSize: 'accesibility/getFontSize',
    }),
  },
  methods: {
    ...mapMutations({
      toggleGrayScale: Mutations.TOOGLE_GRAY_SCALE,
      setFontSize: Mutations.SET_FONT_SIZE,
      resetFontSize: Mutations.RESET_FONT_SIZE,
    }),
  },
})
export default class Accessibility extends Vue {
  showItems: Boolean = false

  fontSize!: number
  setFontSize!: (p: Number) => Promise<void>
  resetFontSize!: () => Promise<void>

  hideItems() {
    this.showItems = false
  }

  handleSetFontPlus() {
    this.setFontSize(this.fontSize + 2)
  }
  handleSetFontMinus() {
    this.setFontSize(this.fontSize - 2)
  }

  mdiFormatAnnotationPlus = mdiFormatAnnotationPlus
  mdiFormatAnnotationMinus = mdiFormatAnnotationMinus
  mdiFormatColorText = mdiFormatColorText
  mdiCircleSlice4 = mdiCircleSlice4
  mdiAccessibility = mdiWheelchairAccessibility
}
</script>

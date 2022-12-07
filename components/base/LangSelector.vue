<template>
  <div class="select-wrapper" v-if="showAllFeatures">
    <v-select
      v-model="selectedLocale"
      :items="$i18n.locales"
      item-value="code"
      hide-details
      hide-selected
      :append-icon="mdiChevronDown"
      height="2rem"
      v-bind="$attrs"
      @change="toggleLanguage"
    >
      <template #selection="{ item }">
        <v-btn icon>
          <v-img
            :src="require(`@/assets/svg/flags/${item.flag}.svg`)"
            width="2rem"
            height="2rem"
            contain
          ></v-img>
        </v-btn>
      </template>
      <template #item="{ item }">
        <v-img
          :src="require(`@/assets/svg/flags/${item.flag}.svg`)"
          width="2rem"
          height="2rem"
          contain
        ></v-img>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { mdiChevronDown } from '@mdi/js'
import { Component, Vue } from 'vue-property-decorator'
import { Locale } from '~/types'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['showAllFeatures']),
  },
})
export default class LangSelector extends Vue {
  selectedLocale = ''

  mdiChevronDown = mdiChevronDown

  mounted() {
    this.selectedLocale = this.$i18n.locale
  }

  toggleLanguage(locale: Locale): void {
    locale !== this.$i18n.locale && this.$i18n.setLocale(locale)
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 4rem;

  :deep(.v-input) {
    padding-top: 0;
    margin-top: 0;

    .v-input__slot {
      &::before,
      &::after {
        content: unset !important;
      }
      .v-select__selections {
        max-height: 40px;
      }
    }
  }
}
</style>

<template>
  <TransitionGroup name="list" tag="ul" mode="out-in" class="ch-fancy-list">
    <li key="fancy-item-header" class="px-md-8">
      <v-row class="body--text" no-gutters justify="space-between" align="center">
        <v-col cols="6" md="auto" class="d-flex align-center">
          <v-checkbox color="secondary" v-model="selectAll" @change="handleToggleAll"></v-checkbox>
          <label v-show="isMobile">{{$t('s.select_all')}}</label>
        </v-col>
        <v-col cols="4" v-if="!isMobile">{{$t('n.name')}}</v-col>
        <v-col cols="3" v-if="!isMobile">{{$t('b.birth_date')}}</v-col>
        <v-col cols="2" v-if="!isMobile">{{$t('p.phone')}}</v-col>
        <v-col cols="6" md="auto">
          <v-btn color="error" @click="handleDeleteItems" class="float-right">
            <v-icon>{{mdiTrashCan}}</v-icon>
            {{$t('d.delete')}}
          </v-btn>
        </v-col>
      </v-row>
    </li>
    <li v-for="(item) in items" :key="`fancy-item-${item.id}`">
      <FancyListItem :customer="item" :selected.sync="selectedItems[item.id]" />
    </li>
  </TransitionGroup>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { ICustomer } from '~/types/interfaces'
import { ResponsiveComponent } from '~/utils/classes'
import FancyListItem from './item.vue'
import { mdiTrashCan } from '@mdi/js'
import { PropType } from 'vue/types/v3-component-props'

@Component<FancyList>({
  components: {
    FancyListItem,
  },
})
export default class FancyList extends ResponsiveComponent {
  @Prop({ type: Array as PropType<ICustomer[]>, required: true })
  readonly items!: ICustomer[]

  selectAll = false
  mdiTrashCan = mdiTrashCan

  selectedItems: Record<string, boolean> = {}

  handleToggleAll() {
    this.selectAll
      ? this.items.forEach(
          ({ id }) => (this.selectedItems[id] = this.selectAll)
        )
      : (this.selectedItems = {})
  }

  async handleDeleteItems() {
    this.selectedItems && this.$emit('delete', Object.keys(this.selectedItems))
  }

  resetSelected() {
    this.selectAll = false
    this.selectedItems = {}
  }
}
</script>

<style lang="scss" scoped>
.ch-fancy-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: initial;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

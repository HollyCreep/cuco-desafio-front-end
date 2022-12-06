<template>
  <TransitionGroup name="list" tag="ul" mode="out-in" class="ch-fancy-list">
    <li style="padding: 0 30px" key="fancy-item-header">
      <v-row class="body--text" no-gutters justify="space-between" align="center">
        <v-col cols="auto">
          <v-checkbox color="secondary" v-model="selectAll" @change="handleToggleAll"></v-checkbox>
        </v-col>
        <v-col cols="10" md="4">Nome</v-col>
        <v-col cols="12" md="3">Data de Nascimento</v-col>
        <v-col cols="12" md="2">Telefone</v-col>
        <v-col cols="12" md="auto">
          <v-btn color="error" @click="handleDeleteItems">
            <v-icon>{{mdiTrashCan}}</v-icon>Excluir
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
import { BaseComponent } from '~/utils/classes'
import FancyListItem from './item.vue'
import { mdiTrashCan } from '@mdi/js'
import { PropType } from 'vue/types/v3-component-props'

@Component<FancyList>({
  components: {
    FancyListItem,
  },
})
export default class FancyList extends BaseComponent {
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

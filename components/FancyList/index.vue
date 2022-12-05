<template>
  <section>
    <ul class="ch-fancy-list">
      <li style="padding: 0 30px">
        <v-row class="body--text" no-gutters justify="space-between" align="center">
          <v-col cols="auto">
            <v-checkbox color="secondary" v-model="selectAll" @change="handleSelectAll"></v-checkbox>
          </v-col>
          <v-col cols="10" md="4">Nome</v-col>
          <v-col cols="12" md="3">Data de Nascimento</v-col>
          <v-col cols="12" md="2">Telefone</v-col>
          <v-col cols="12" md="auto">
            <v-btn color="secondary" @click="handleDeleteItems">
              <v-icon>{{mdiTrashCan}}</v-icon>Excluir
            </v-btn>
          </v-col>
        </v-row>
      </li>
      <li v-for="(item, index) in items" :key="`fancy-item-${index}`">
        <FancyListItem
          :customer="item"
          :ref="`fancy-item-${index}`"
          @change="handleItemChanged($event, index)"
        />
      </li>
    </ul>
    <v-dialog v-model="openModal" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="openModal = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
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

  $refs!: {
    'fancy-item-0': FancyListItem[]
    'fancy-item-1': FancyListItem[]
    'fancy-item-2': FancyListItem[]
    'fancy-item-3': FancyListItem[]
    'fancy-item-4': FancyListItem[]
  }

  selectAll = false
  openModal = false
  mdiTrashCan = mdiTrashCan

  selectedItems: string[] = []

  handleSelectAll() {
    this.selectedItems = this.selectAll ? this.items.map((c) => c.id) : []

    Object.entries(this.$refs).forEach(([_key, [fancyItem]]) =>
      fancyItem.toggleSelected(this.selectAll)
    )
  }

  handleItemChanged(value: Boolean, index: number) {
    const { id } = this.items[index]
    const uniqArray = new Set(this.selectedItems)
    value ? uniqArray.add(id) : uniqArray.delete(id)

    this.selectedItems = [...uniqArray]
  }

  handleDeleteItems() {
    this.selectedItems.length && (this.openModal = true)
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
</style>

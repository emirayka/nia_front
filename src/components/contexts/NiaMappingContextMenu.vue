<template>
  <NiaContextMenu
    :items="items"
    :shown="shown"
    :x="x"
    :y="y"
    @hide="hideHandler()"
    @click="clickHandler($event)"
  />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {NiaContextMenuItemData} from '@/components/nia/lib'
  import {NiaMapping} from '@/utils'

  const ITEM_ADD_MAPPING = 'Add mapping'
  const ITEM_REMOVE_MAPPING = 'Remove mapping'
  const ITEM_REMOVE_MAPPINGS = 'Remove mappings'

  @Component({
    name: 'MappingContextMenu',
  })
  export default class MappingContextMenu extends Vue {
    addMapping(): void {
      store.commit.UI.AddMappingDialog.show()
    }

    removeSelectedMappings(): void {
      const mapping: NiaMapping | null = store.getters.UI.MappingTable.selectedMapping

      if (mapping === null) {
        return
      }

      store.dispatch.Connection.removeMapping({
        keyChords: mapping.getKeyChords()
      })
    }

    removeClickedMapping(mapping: NiaMapping): void {
      store.dispatch.Connection.removeMapping({
        keyChords: mapping.getKeyChords()
      })
    }

    clickHandler(name: string): void {
      const mapping: NiaMapping | null = store.getters.Context.Mapping.mapping

      if (mapping !== null) {
        switch (name) {
          case ITEM_ADD_MAPPING:
            this.addMapping()
            break

          case ITEM_REMOVE_MAPPINGS:
            this.removeSelectedMappings()
            break

          case ITEM_REMOVE_MAPPING:
            this.removeClickedMapping(mapping)
            break
        }
      }

      store.commit.Context.Mapping.hide()
    }

    hideHandler(): void {
      store.commit.Context.Mapping.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      const selectedMappings: Array<NiaMapping> = []
      const mapping: NiaMapping | null = store.getters.UI.MappingTable.selectedMapping

      if (mapping !== null) {
        selectedMappings.push(mapping)
      }

      const clickedMapping: NiaMapping | null = store.getters.Context.Mapping.mapping

      items.push({
        name: ITEM_ADD_MAPPING,
        text: ITEM_ADD_MAPPING,
      })

      if (clickedMapping === null) {
        return items
      }

      for (const selectedMapping of selectedMappings) {
        if (selectedMapping.same(clickedMapping)) {
          items.push({
            name: ITEM_REMOVE_MAPPINGS,
            text: ITEM_REMOVE_MAPPINGS,
          })

          break
        }
      }

      if (items.length === 1) {
        items.push({
          name: ITEM_REMOVE_MAPPING,
          text: ITEM_REMOVE_MAPPING,
        })
      }

      return items
    }

    get shown(): boolean {
      return store.getters.Context.Mapping.shown
    }

    get x(): number {
      return store.getters.Context.Mapping.x
    }

    get y(): number {
      return store.getters.Context.Mapping.y
    }
  }
</script>

<style scoped>

</style>

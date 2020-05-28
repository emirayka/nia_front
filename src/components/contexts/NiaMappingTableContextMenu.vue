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

  const ITEM_ADD_MAPPING = 'Add mapping'

  @Component({
    name: 'MappingTableContextMenu',
  })
  export default class MappingTableContextMenu extends Vue {
    addMapping(): void {
      store.commit.UI.AddMappingDialog.show()
    }

    clickHandler(name: string): void {
      switch (name) {
        case ITEM_ADD_MAPPING:
          this.addMapping()
          break
      }

      store.commit.Context.MappingTable.hide()
    }

    hideHandler(): void {
      store.commit.Context.MappingTable.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      items.push({
        name: ITEM_ADD_MAPPING,
        text: ITEM_ADD_MAPPING,
      })

      return items
    }

    get shown(): boolean {
      return store.getters.Context.MappingTable.shown
    }

    get x(): number {
      return store.getters.Context.MappingTable.x
    }

    get y(): number {
      return store.getters.Context.MappingTable.y
    }
  }
</script>

<style scoped>

</style>

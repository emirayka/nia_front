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

  const ITEM_ADD_ACTION = 'Add action'

  @Component({
    name: 'ActionTableContextMenu',
  })
  export default class ActionTableContextMenu extends Vue {
    addAction() {
      store.commit.UI.AddActionDialog.show()
    }

    clickHandler(name: string): void {
      switch (name) {
        case ITEM_ADD_ACTION:
          this.addAction()
          break
      }

      store.commit.Context.ActionTable.hide()
    }

    hideHandler(): void {
      store.commit.Context.ActionTable.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      items.push({
        name: ITEM_ADD_ACTION,
        text: ITEM_ADD_ACTION,
      })

      return items
    }

    get shown(): boolean {
      return store.getters.Context.ActionTable.shown
    }

    get x(): number {
      return store.getters.Context.ActionTable.x
    }

    get y(): number {
      return store.getters.Context.ActionTable.y
    }
  }
</script>

<style scoped>

</style>

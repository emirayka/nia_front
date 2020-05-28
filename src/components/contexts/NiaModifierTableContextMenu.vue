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

  const ITEM_ADD_MODIFIER = 'Add modifier'

  @Component({
    name: 'ModifierTableContextMenu',
  })
  export default class ModifierTableContextMenu extends Vue {
    addModifier(): void {
      store.commit.UI.AddModifierDialog.show()
    }

    clickHandler(name: string): void {
      switch (name) {
        case ITEM_ADD_MODIFIER:
          this.addModifier()
          break
      }

      store.commit.Context.ModifierTable.hide()
    }

    hideHandler(): void {
      store.commit.Context.ModifierTable.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      items.push({
        name: ITEM_ADD_MODIFIER,
        text: ITEM_ADD_MODIFIER,
      })

      return items
    }

    get shown(): boolean {
      return store.getters.Context.ModifierTable.shown
    }

    get x(): number {
      return store.getters.Context.ModifierTable.x
    }

    get y(): number {
      return store.getters.Context.ModifierTable.y
    }
  }
</script>

<style scoped>

</style>

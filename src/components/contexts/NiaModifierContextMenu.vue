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
  import {NiaModifierDescription} from '@/utils'

  const ITEM_ADD_MODIFIER = 'Add modifier'
  const ITEM_REMOVE_MODIFIER = 'Remove modifier'
  const ITEM_REMOVE_MODIFIERS = 'Remove modifiers'

  @Component({
    name: 'ModifierContextMenu',
  })
  export default class ModifierContextMenu extends Vue {
    addModifier(): void {
      store.commit.UI.AddModifierDialog.show()
    }

    removeSelectedModifiers(): void {
      const selectedModifiers: Array<NiaModifierDescription> = store.getters.UI.ModifierTable.selectedModifiers

      for (const selectedModifier of selectedModifiers) {
        store.dispatch.Connection.removeModifier({
          deviceId: selectedModifier.getKey().getDeviceId(),
          keyCode: selectedModifier.getKey().getKeyCode(),
        })
      }

      store.commit.UI.ModifierTable.unselectModifiers()
    }

    removeClickedModifier(modifier: NiaModifierDescription): void {
      store.dispatch.Connection.removeModifier({
        deviceId: modifier.getKey().getDeviceId(),
        keyCode: modifier.getKey().getKeyCode(),
      })
    }

    clickHandler(name: string): void {
      const modifier: NiaModifierDescription | null = store.getters.Context.Modifier.modifier

      if (modifier !== null) {
        switch (name) {
          case ITEM_ADD_MODIFIER:
            this.addModifier()
            break

          case ITEM_REMOVE_MODIFIERS:
            this.removeSelectedModifiers()
            break

          case ITEM_REMOVE_MODIFIER:
            this.removeClickedModifier(modifier)
            break
        }
      }

      store.commit.Context.Modifier.hide()
    }

    hideHandler(): void {
      store.commit.Context.Modifier.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      const selectedModifiers: Array<NiaModifierDescription> = store.getters.UI.ModifierTable.selectedModifiers
      const clickedModifier: NiaModifierDescription | null = store.getters.Context.Modifier.modifier

      items.push({
        name: ITEM_ADD_MODIFIER,
        text: ITEM_ADD_MODIFIER,
      })

      if (clickedModifier === null) {
        return items
      }

      for (const selectedModifier of selectedModifiers) {
        if (selectedModifier.getKey().same(clickedModifier.getKey())) {
          items.push({
            name: ITEM_REMOVE_MODIFIERS,
            text: ITEM_REMOVE_MODIFIERS,
          })

          break
        }
      }

      if (items.length === 1) {
        items.push({
          name: ITEM_REMOVE_MODIFIER,
          text: ITEM_REMOVE_MODIFIER,
        })
      }

      return items
    }

    get shown(): boolean {
      return store.getters.Context.Modifier.shown
    }

    get x(): number {
      return store.getters.Context.Modifier.x
    }

    get y(): number {
      return store.getters.Context.Modifier.y
    }
  }
</script>

<style scoped>

</style>

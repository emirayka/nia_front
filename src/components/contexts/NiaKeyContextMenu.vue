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
  import {NiaAction, NiaActionTextType, NiaKey, NiaKeyChord, NiaMapping} from '@/utils'

  const ITEM_UNSELECT = 'Unselect'
  const ITEM_SELECT = 'Select'
  const ITEM_REMOVE_FROM_MODIFIERS = 'Remove from modifiers'
  const ITEM_ADD_TO_MODIFIERS = 'Add to modifiers'
  const ITEM_ADD_MAPPING = 'Add mapping'

  @Component({
    name: 'KeyContextMenu',
  })
  export default class KeyContextMenu extends Vue {
    addToModifiers(): void {
      const key: NiaKey | null = store.getters.Context.Key.key

      if (key === null) {
        return
      }

      const deviceId: number | null = key.getDeviceId()

      if (deviceId === null) {
        return
      }

      const keyCode: number = key.getKeyCode()

      store.commit.UI.AddModifierDialog.setSelectedDeviceId(deviceId)
      store.commit.UI.AddModifierDialog.setSelectedKeyCode(keyCode)
      store.commit.UI.AddModifierDialog.setSelectedModifierAlias('')
      store.commit.UI.AddModifierDialog.show()
    }

    addMapping(): void {
      const selectedKeys: Array<NiaKey> = store.getters.UI.Devices.selectedKeys
      const selectedOrdinaryKeys: Array<NiaKey> = selectedKeys.filter((key: NiaKey) => {
        return !store.getters.Keymapping.Modifiers.isKeyModifier(key)
      })
      const selectedModifierKeys: Array<NiaKey> = selectedKeys.filter((key: NiaKey) => {
        return store.getters.Keymapping.Modifiers.isKeyModifier(key)
      })

      if (selectedOrdinaryKeys.length === 1) {
        const ordinaryKey: NiaKey = selectedOrdinaryKeys[0]

        const keyChord: NiaKeyChord = new NiaKeyChord({
          modifiers: selectedModifierKeys,
          ordinaryKey,
        })

        const action: NiaAction = new NiaActionTextType({
          text: '',
        }).toAction()

        const mapping: NiaMapping = new NiaMapping({
          keyChords: [keyChord],
          action,
        })

        store.dispatch.Connection.defineMapping({
          mapping,
        })
      }
    }

    clickHandler(name: string): void {
      const key: NiaKey | null = store.getters.Context.Key.key

      if (key !== null) {
        switch (name) {
          case ITEM_UNSELECT:
            store.commit.UI.Devices.toggleKeySelection(key)
            break;

          case ITEM_SELECT:
            store.commit.UI.Devices.toggleKeySelection(key)
            break;

          case ITEM_REMOVE_FROM_MODIFIERS:
            store.dispatch.Connection.removeModifier({
              deviceId: key.getDeviceId(),
              keyCode: key.getKeyCode(),
            })
            break;

          case ITEM_ADD_TO_MODIFIERS:
            this.addToModifiers()
            break;

          case ITEM_ADD_MAPPING:
            this.addMapping()
            break
        }
      }

      store.commit.Context.Key.hide()
    }

    hideHandler(): void {
      store.commit.Context.Key.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      if (store.getters.Context.Key.isSelected) {
        items.push({
          name: ITEM_UNSELECT,
          text: ITEM_UNSELECT,
        })

        const selectedKeys: Array<NiaKey> = store.getters.UI.Devices.selectedKeys
        const selectedOrdinaryKeys: Array<NiaKey> = selectedKeys.filter((key: NiaKey) => {
          return !store.getters.Keymapping.Modifiers.isKeyModifier(key)
        })

        if (selectedOrdinaryKeys.length === 1) {
          items.push({
            name: ITEM_ADD_MAPPING,
            text: ITEM_ADD_MAPPING,
          })
        }
      } else {
        items.push({
          name: ITEM_SELECT,
          text: ITEM_SELECT,
        })
      }

      if (store.getters.Context.Key.isModifier) {
        items.push({
          name: ITEM_REMOVE_FROM_MODIFIERS,
          text: ITEM_REMOVE_FROM_MODIFIERS,
        })
      } else {
        items.push({
          name: ITEM_ADD_TO_MODIFIERS,
          text: ITEM_ADD_TO_MODIFIERS,
        })
      }

      return items
    }

    get shown(): boolean {
      return store.getters.Context.Key.shown
    }

    get x(): number {
      return store.getters.Context.Key.x
    }

    get y(): number {
      return store.getters.Context.Key.y
    }
  }
</script>

<style scoped>

</style>
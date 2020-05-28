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
  import {NiaNamedAction} from '@/utils'

  const ITEM_ADD_ACTION = 'Add action'
  const ITEM_REMOVE_ACTION = 'Remove action'
  const ITEM_REMOVE_ACTIONS = 'Remove actions'

  @Component({
    name: 'ActionContextMenu',
  })
  export default class ActionContextMenu extends Vue {
    addAction(): void {
      store.commit.UI.AddActionDialog.show()
    }

    removeSelectedActions(): void {
      const selectedActions: Array<NiaNamedAction> = store.getters.UI.ActionTable.selectedActions

      for (const selectedAction of selectedActions) {
        store.dispatch.Connection.removeAction({
          actionName: selectedAction.getActionName()
        })
      }

      store.commit.UI.ActionTable.unselectActions()
    }

    removeClickedAction(action: NiaNamedAction): void {
      store.dispatch.Connection.removeAction({
        actionName: action.getActionName()
      })
    }

    clickHandler(name: string): void {
      const action: NiaNamedAction | null = store.getters.Context.Action.action

      if (action !== null) {
        switch (name) {
          case ITEM_ADD_ACTION:
            this.addAction()
            break

          case ITEM_REMOVE_ACTIONS:
            this.removeSelectedActions()
            break

          case ITEM_REMOVE_ACTION:
            this.removeClickedAction(action)
            break
        }
      }

      store.commit.Context.Action.hide()
    }

    hideHandler(): void {
      store.commit.Context.Action.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      const selectedActions: Array<NiaNamedAction> = store.getters.UI.ActionTable.selectedActions
      const clickedAction: NiaNamedAction | null = store.getters.Context.Action.action

      items.push({
        name: ITEM_ADD_ACTION,
        text: ITEM_ADD_ACTION,
      })

      if (clickedAction === null) {
        return items
      }

      for (const selectedAction of selectedActions) {
        if (selectedAction.getActionName() === clickedAction.getActionName()) {
          items.push({
            name: ITEM_REMOVE_ACTIONS,
            text: ITEM_REMOVE_ACTIONS,
          })

          break
        }
      }

      if (items.length === 1) {
        items.push({
          name: ITEM_REMOVE_ACTION,
          text: ITEM_REMOVE_ACTION,
        })
      }

      return items
    }

    get shown(): boolean {
      return store.getters.Context.Action.shown
    }

    get x(): number {
      return store.getters.Context.Action.x
    }

    get y(): number {
      return store.getters.Context.Action.y
    }
  }
</script>

<style scoped>

</style>

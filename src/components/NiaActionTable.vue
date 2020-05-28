<template>
  <div class="nia-action-table"
       @contextmenu="actionTableContextMenuHandler(action, $event)"
  >
    <NiaContainer class="nia-action-table__controls">
      <NiaButton @click.stop="addActionHandler()">+</NiaButton>
      <NiaButton @click.stop="removeSelectedActionsHandler()">-</NiaButton>
    </NiaContainer>

    <NiaTable
      class="nia-action-table__actions"
      :columns="columns"
    >

      <NiaTableRow
        v-for="(action, index) in definedActions"
        class="nia-action-table__actions__action"
        :class="actionRowClasses(action)"
        :key="index"
        @click="toggleActionSelectionHandler(action)"
        @contextmenu="actionRowContextMenuHandler(action, $event)"
        @hover="hoverHandler(action, $event)"
      >
        <NiaTableRowItem>
          <span
            class="nia-action-table__actions__action__action-name"
          >
            {{ action.getActionName() }}
          </span>
        </NiaTableRowItem>
      </NiaTableRow>
    </NiaTable>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'
  import {NiaNamedAction} from '@/utils'

  @Component({
    name: 'NiaActionTable',
  })
  export default class NiaActionTable extends Vue {
    private hoverAction: NiaNamedAction | null = null

    // methods
    actionRowClasses(action: NiaNamedAction): object {
      for (const selectedAction of this.selectedActions) {
        if (action.getActionName() == selectedAction.getActionName()) {
          return {
            selected: true,
          }
        }
      }

      return {
        hover: this.hoverAction === action,
      }
    }

    // computed
    get columns(): Array<NiaTableColumnDefinition> {
      return [
        {
          name: 'Action name',
          width: 100,
        },
      ]
    }

    get definedActions(): Array<NiaNamedAction> {
      return store.getters.Keymapping.Actions.definedActions
    }

    get selectedActions(): Array<NiaNamedAction> {
      return store.getters.UI.ActionTable.selectedActions
    }

    // handlers
    hoverHandler(action: NiaNamedAction, hover: boolean): void {
      if (hover) {
        this.hoverAction = action
      } else {
        this.hoverAction = null
      }
    }

    addActionHandler() {
      store.commit.UI.AddActionDialog.show()
    }

    removeSelectedActionsHandler() {
      const selectedActions: Array<NiaNamedAction> = store.getters.UI.ActionTable.selectedActions

      for (const selectedAction of selectedActions) {
        store.dispatch.Connection.removeAction({
          actionName: selectedAction.getActionName()
        })
      }

      store.commit.UI.ActionTable.unselectActions()
    }

    toggleActionSelectionHandler(action: NiaNamedAction) {
      store.commit.UI.ActionTable.toggleActionSelection(action)
    }

    actionRowContextMenuHandler(action: NiaNamedAction, event: MouseEvent) {
      store.commit.Context.Action.setAction(action)
      store.commit.Context.Action.setX(event.pageX)
      store.commit.Context.Action.setY(event.pageY)
      store.commit.Context.Action.show()
    }

    actionTableContextMenuHandler(action: NiaNamedAction, event: MouseEvent) {
      store.commit.Context.ActionTable.setX(event.pageX)
      store.commit.Context.ActionTable.setY(event.pageY)
      store.commit.Context.ActionTable.show()
    }
  }
</script>

<style scoped>
  .nia-action-table {
    min-height: 350px;
  }

  .nia-action-table__actions__action.selected {
    background-color: lightgoldenrodyellow !important;
    color: black !important;
  }

  .nia-action-table__actions__action.hover {
    background-color: #777777 !important;
  }

  .nia-action-table__actions__action__action-name {
    user-select: none;
  }
</style>

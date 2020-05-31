<template>
  <div class="nia-action-table"
       @contextmenu="actionTableContextMenuHandler(action, $event)"
  >
    <NiaContainer class="nia-action-table__controls">
      <NiaButton @click.stop="addActionHandler()">+</NiaButton>
      <NiaButton @click.stop="removeSelectedActionsHandler()">-</NiaButton>
    </NiaContainer>

    <NiaScrollBar>
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
            {{ getActionName(action) }}
          </span>
          </NiaTableRowItem>

          <NiaTableRowItem>
          <span
            class="nia-action-table__actions__action__action-type"
          >
            {{ getActionType(action) }}
          </span>
          </NiaTableRowItem>

          <template v-if="getActionArgumentCount(action) === 1">
            <NiaTableRowItem>
          <span
            class="nia-action-table__actions__action__action-first-argument"
          >
            {{ getFirstArgument(action) }}
          </span>
            </NiaTableRowItem>
          </template>

          <template v-else>
            <NiaTableRowItem>
          <span
            class="nia-action-table__actions__action__action-first-argument"
          >
            {{ getFirstArgument(action) }}
          </span>
            </NiaTableRowItem>

            <NiaTableRowItem>
          <span
            class="nia-action-table__actions__action__action-second-argument"
          >
            {{ getSecondArgument(action) }}
          </span>
            </NiaTableRowItem>
          </template>
        </NiaTableRow>
      </NiaTable>
    </NiaScrollBar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'
  import {NiaAction, NiaNamedAction} from '@/utils'

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
          name: 'Name',
          width: 25,
        },
        {
          name: 'Type',
          width: 25,
        },
        {
          name: '',
          width: 25,
        },
        {
          name: '',
          width: 25,
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

    getActionName(action: NiaNamedAction): string {
      return action.getActionName()
    }

    getActionType(action: NiaNamedAction): string {
      return action.getAction().getActionTypeName()
    }

    getActionArgumentCount(action: NiaNamedAction): number {
      return action.getAction().getArgumentCount()
    }

    getFirstArgument(action: NiaNamedAction): string {
      return action.getAction().getFirstArgument()
    }

    getSecondArgument(action: NiaNamedAction): string {
      return action.getAction().getSecondArgument()
    }
  }
</script>

<style scoped>
  .nia-action-table {
    height: 350px;
  }

  .ps {
    height: 300px;
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

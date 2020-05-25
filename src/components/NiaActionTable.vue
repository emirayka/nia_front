<template>
  <div class="nia-action-table">
    <NiaContainer class="nia-action-table__controls">
      <NiaButton @click.stop="addActionHandler()">+</NiaButton>
      <NiaButton @click.stop="removeSelectedActionsHandler()">-</NiaButton>
    </NiaContainer>

    <NiaTable
      class="nia-action-action"
      :columns="columns"
    >

      <NiaTableRow
        v-for="(action, index) in definedActions"
        class="nia-action-table__actions__action"
        :class="actionRowClasses(action)"
        :key="index"
        @click.stop="toggleActionSelectionHandler(action)"
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
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'
  import {mapKeyCodeToString, NiaDeviceInfo, NiaNamedAction} from '@/utils'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

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
      return store.getters.UI.General.selectedActions
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
      const selectedActions: Array<NiaNamedAction> = store.getters.UI.General.selectedActions

      for (const selectedAction of selectedActions) {
        store.dispatch.Connection.removeAction({
          actionName: selectedAction.getActionName()
        })
      }

      store.commit.UI.General.unselectActions()
    }

    toggleActionSelectionHandler(action: NiaNamedAction) {
      store.commit.UI.General.toggleActionSelection(action)
    }
  }
</script>

<style scoped>
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

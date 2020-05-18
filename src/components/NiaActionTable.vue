<template>
  <div class="nia-action-table">
    <div class="nia-action-table__controls">
      <NiaButton @click.stop="addActionHandler()">+</NiaButton>
      <NiaButton @click.stop="removeSelectedActionsHandler()">-</NiaButton>
      <NiaButton>3</NiaButton>
    </div>

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
  import {mapKeyCodeToString, NiaDeviceInfo, NiaAction} from '@/utils'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

  @Component({
    name: 'NiaActionTable',
  })
  export default class NiaActionTable extends Vue {
    private hoverAction: NiaAction | null = null

    // methods
    actionRowClasses(action: NiaAction): object {
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

    get definedActions(): Array<NiaAction> {
      return store.getters.KeymappingModule.definedActions
    }

    get selectedActions(): Array<NiaAction> {
      return store.getters.UIModule.getSelectedActions
    }

    // handlers
    hoverHandler(action: NiaAction, hover: boolean): void {
      if (hover) {
        this.hoverAction = action
      } else {
        this.hoverAction = null
      }
    }

    addActionHandler() {
      store.commit.UIModule.showAddActionDialog()
    }

    removeSelectedActionsHandler() {
      const selectedActions: Array<NiaAction> = store.getters.UIModule.getSelectedActions


    }

    toggleActionSelectionHandler(action: NiaAction) {
      store.commit.UIModule.toggleActionSelection(action)
    }
  }
</script>

<style scoped>
  .nia-action-table__actions__action__action-name {
    user-select: none;
  }
</style>

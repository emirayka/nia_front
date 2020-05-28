import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'
const logger = loggers('Action Table Module')

import {moduleActionContext, moduleGetterContext} from '@/store'

import {NiaNamedAction} from '@/utils'

export interface ActionTableState {
  selectedActions: Array<NiaNamedAction>,
}

const ActionTableModule = defineModule({
  namespaced: true,
  state: {
    selectedActions: [],
  } as ActionTableState,
  mutations: {
    toggleActionSelection: (state: ActionTableState, action: NiaNamedAction) => {
      for (const selectedAction of state.selectedActions) {
        if (selectedAction.getActionName() === action.getActionName()) {
          state.selectedActions = state.selectedActions
            .filter((selectedAction) => selectedAction.getActionName() !== action.getActionName())
          return
        }
      }

      state.selectedActions.push(action)
    },
    selectAction: (state: ActionTableState, action: NiaNamedAction) => {
      state.selectedActions = [action]
    },
    unselectActions: (state: ActionTableState) => {
      state.selectedActions = []
    },
  },
  getters: {
    selectedActions: (state: ActionTableState) => state.selectedActions,
  },
})

export default ActionTableModule

const ActionTableModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ActionTableModule)
const ActionTableModuleActionContext = (context: any) => moduleActionContext(context, ActionTableModule)

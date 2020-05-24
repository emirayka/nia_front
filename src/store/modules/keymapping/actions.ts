import Vue from 'vue'
import {NiaAction, NiaNamedAction} from '@/utils'
import {defineModule} from 'direct-vuex'

import {moduleActionContext, moduleGetterContext} from '@/store'

export interface ActionsModuleState {
  definedActions: Array<NiaNamedAction>,
}

const ActionsModule = defineModule({
  namespaced: true,
  state: {
    definedActions: [],
  } as ActionsModuleState,
  getters: {
    definedActions: (state: ActionsModuleState) => state.definedActions,
  },
  mutations: {
    setActions(state: ActionsModuleState, actions: Array<NiaNamedAction>) {
      state.definedActions.splice(0)
      state.definedActions.push(...actions)
    },
    defineAction: (state: ActionsModuleState, action: NiaNamedAction) => {
      // todo: show error when action is already defined
      state.definedActions.push(
        action,
      )
    },
    removeAction: (state: ActionsModuleState, actionName: string) => {
      state.definedActions = state.definedActions.filter(
        (action) => action.getActionName() !== actionName,
      )
    },
  },
})

export default ActionsModule

const ActionsModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ActionsModule)
const ActionsModuleActionContext = (context: any) => moduleActionContext(context, ActionsModule)

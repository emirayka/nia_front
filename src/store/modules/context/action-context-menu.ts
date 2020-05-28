import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/action')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaNamedAction} from '@/utils'

export interface ActionContextMenuState {
  shown: boolean;
  action: NiaNamedAction | null;
  x: number;
  y: number;
}

const ActionContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    action: null,
    x: 0,
    y: 0,
  } as ActionContextMenuState,
  mutations: {
    show: (state: ActionContextMenuState) => {
      state.shown = true
    },
    setAction: (state: ActionContextMenuState, action: NiaNamedAction) => {
      state.action = action
    },
    setX: (state: ActionContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: ActionContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: ActionContextMenuState) => {
      state.shown = false
      state.action = null
    },
  },
  getters: {
    shown: (state: ActionContextMenuState) => state.shown,
    action: (state: ActionContextMenuState) => state.action,
    x: (state: ActionContextMenuState) => state.x,
    y: (state: ActionContextMenuState) => state.y,
  },
})

export default ActionContextMenuModule

const ActionContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ActionContextMenuModule)
const ActionContextMenuModuleActionContext = (context: any) => moduleActionContext(context, ActionContextMenuModule)

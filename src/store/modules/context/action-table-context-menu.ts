import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/action-table')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaNamedAction} from '@/utils'

export interface ActionTableContextMenuState {
  shown: boolean;
  x: number;
  y: number;
}

const ActionTableContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    x: 0,
    y: 0,
  } as ActionTableContextMenuState,
  mutations: {
    show: (state: ActionTableContextMenuState) => {
      state.shown = true
    },
    setX: (state: ActionTableContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: ActionTableContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: ActionTableContextMenuState) => {
      state.shown = false
      state.x = 0
      state.y = 0
    },
  },
  getters: {
    shown: (state: ActionTableContextMenuState) => state.shown,
    x: (state: ActionTableContextMenuState) => state.x,
    y: (state: ActionTableContextMenuState) => state.y,
  },
})

export default ActionTableContextMenuModule

const ActionTableContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ActionTableContextMenuModule)
const ActionTableContextMenuModuleActionContext = (context: any) => moduleActionContext(context, ActionTableContextMenuModule)

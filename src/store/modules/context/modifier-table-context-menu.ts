import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/modifier-table')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaModifierDescription} from '@/utils'

export interface ModifierTableContextMenuState {
  shown: boolean;
  x: number;
  y: number;
}

const ModifierTableContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    x: 0,
    y: 0,
  } as ModifierTableContextMenuState,
  mutations: {
    show: (state: ModifierTableContextMenuState) => {
      state.shown = true
    },
    setX: (state: ModifierTableContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: ModifierTableContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: ModifierTableContextMenuState) => {
      state.shown = false
      state.x = 0
      state.y = 0
    },
  },
  getters: {
    shown: (state: ModifierTableContextMenuState) => state.shown,
    x: (state: ModifierTableContextMenuState) => state.x,
    y: (state: ModifierTableContextMenuState) => state.y,
  },
})

export default ModifierTableContextMenuModule

const ModifierTableContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ModifierTableContextMenuModule)
const ModifierTableContextMenuModuleActionContext = (context: any) => moduleActionContext(context, ModifierTableContextMenuModule)

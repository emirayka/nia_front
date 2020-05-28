import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/modifier')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaModifierDescription} from '@/utils'

export interface ModifierContextMenuState {
  shown: boolean;
  modifier: NiaModifierDescription | null;
  x: number;
  y: number;
}

const ModifierContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    modifier: null,
    x: 0,
    y: 0,
  } as ModifierContextMenuState,
  mutations: {
    show: (state: ModifierContextMenuState) => {
      state.shown = true
    },
    setModifier: (state: ModifierContextMenuState, modifier: NiaModifierDescription) => {
      state.modifier = modifier
    },
    setX: (state: ModifierContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: ModifierContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: ModifierContextMenuState) => {
      state.shown = false
      state.modifier = null
    },
  },
  getters: {
    shown: (state: ModifierContextMenuState) => state.shown,
    modifier: (state: ModifierContextMenuState) => state.modifier,
    x: (state: ModifierContextMenuState) => state.x,
    y: (state: ModifierContextMenuState) => state.y,
  },
})

export default ModifierContextMenuModule

const ModifierContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ModifierContextMenuModule)
const ModifierContextMenuModuleActionContext = (context: any) => moduleActionContext(context, ModifierContextMenuModule)

import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/mapping')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaMapping} from '@/utils'

export interface MappingContextMenuState {
  shown: boolean;
  mapping: NiaMapping | null;
  x: number;
  y: number;
}

const MappingContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    mapping: null,
    x: 0,
    y: 0,
  } as MappingContextMenuState,
  mutations: {
    show: (state: MappingContextMenuState) => {
      state.shown = true
    },
    setMapping: (state: MappingContextMenuState, mapping: NiaMapping) => {
      state.mapping = mapping
    },
    setX: (state: MappingContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: MappingContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: MappingContextMenuState) => {
      state.shown = false
      state.mapping = null
    },
  },
  getters: {
    shown: (state: MappingContextMenuState) => state.shown,
    mapping: (state: MappingContextMenuState) => state.mapping,
    x: (state: MappingContextMenuState) => state.x,
    y: (state: MappingContextMenuState) => state.y,
  },
})

export default MappingContextMenuModule

const MappingContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, MappingContextMenuModule)
const MappingContextMenuModuleActionContext = (context: any) => moduleActionContext(context, MappingContextMenuModule)

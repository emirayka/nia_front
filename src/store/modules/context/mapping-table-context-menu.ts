import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/modifier-table')

import {moduleActionContext, moduleGetterContext} from '@/store'

export interface MappingTableContextMenuState {
  shown: boolean;
  x: number;
  y: number;
}

const MappingTableContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    x: 0,
    y: 0,
  } as MappingTableContextMenuState,
  mutations: {
    show: (state: MappingTableContextMenuState) => {
      state.shown = true
    },
    setX: (state: MappingTableContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: MappingTableContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: MappingTableContextMenuState) => {
      state.shown = false
      state.x = 0
      state.y = 0
    },
  },
  getters: {
    shown: (state: MappingTableContextMenuState) => state.shown,
    x: (state: MappingTableContextMenuState) => state.x,
    y: (state: MappingTableContextMenuState) => state.y,
  },
})

export default MappingTableContextMenuModule

const MappingTableContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, MappingTableContextMenuModule)
const MappingTableContextMenuModuleActionContext = (context: any) => moduleActionContext(context, MappingTableContextMenuModule)

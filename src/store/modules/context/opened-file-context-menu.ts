import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'
import {moduleActionContext, moduleGetterContext} from '@/store'
import {TreePart} from '@/utils'
import {NiaFile} from '@/store/modules/file'

const logger = loggers('store/contexts/action')

export interface OpenedFileContextMenuState {
  shown: boolean;
  file: NiaFile | null,
  x: number;
  y: number;
}

const OpenedFileContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    file: null,
    x: 0,
    y: 0,
  } as OpenedFileContextMenuState,
  mutations: {
    show: (state: OpenedFileContextMenuState) => {
      state.shown = true
    },
    setFile: (state: OpenedFileContextMenuState, file: NiaFile) => {
      state.file = file
    },
    setX: (state: OpenedFileContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: OpenedFileContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: OpenedFileContextMenuState) => {
      state.shown = false
    },
  },
  getters: {
    shown: (state: OpenedFileContextMenuState) => state.shown,
    file: (state: OpenedFileContextMenuState) => state.file,
    x: (state: OpenedFileContextMenuState) => state.x,
    y: (state: OpenedFileContextMenuState) => state.y,
  },
})

export default OpenedFileContextMenuModule

const OpenedFileContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, OpenedFileContextMenuModule)
const OpenedFileContextMenuModuleActionContext = (context: any) => moduleActionContext(context, OpenedFileContextMenuModule)

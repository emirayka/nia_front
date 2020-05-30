import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'
import {moduleActionContext, moduleGetterContext} from '@/store'
import {TreePart} from '@/utils'

const logger = loggers('store/contexts/action')

export interface EditorFileTreeContextMenuState {
  shown: boolean;
  item: TreePart | null;
  x: number;
  y: number;
}

const EditorFileTreeContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    item: null,
    x: 0,
    y: 0,
  } as EditorFileTreeContextMenuState,
  mutations: {
    show: (state: EditorFileTreeContextMenuState) => {
      state.shown = true
    },
    setX: (state: EditorFileTreeContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: EditorFileTreeContextMenuState, y: number) => {
      state.y = y
    },
    setItem: (state: EditorFileTreeContextMenuState, item: TreePart) => {
      state.item = item
    },
    hide: (state: EditorFileTreeContextMenuState) => {
      state.shown = false
    },
  },
  getters: {
    shown: (state: EditorFileTreeContextMenuState) => state.shown,
    x: (state: EditorFileTreeContextMenuState) => state.x,
    y: (state: EditorFileTreeContextMenuState) => state.y,
    item: (state: EditorFileTreeContextMenuState) => state.item,
  },
})

export default EditorFileTreeContextMenuModule

const EditorFileTreeContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, EditorFileTreeContextMenuModule)
const EditorFileTreeContextMenuModuleActionContext = (context: any) => moduleActionContext(context, EditorFileTreeContextMenuModule)

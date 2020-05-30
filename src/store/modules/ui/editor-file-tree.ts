import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('Action Table Module')

import {moduleActionContext, moduleGetterContext} from '@/store'

import {NiaNamedAction, TreePart} from '@/utils'

export interface EditorFileState {
  selectedItems: Array<string>,
}

const EditorFileModule = defineModule({
  namespaced: true,
  state: {
    selectedItems: [],
  } as EditorFileState,
  getters: {
    selectedItems: (state: EditorFileState): Array<string> => {
      return state.selectedItems
    },
    isSelected: (state: EditorFileState) => (item: TreePart) => {
      return state.selectedItems.includes(item.fullPath)
    },
  },
  mutations: {
    selectItem: (state: EditorFileState, item: TreePart) => {
      state.selectedItems = [item.fullPath]
    },
    toggleItemSelection: (state: EditorFileState, item: TreePart) => {
      const lengthBefore: number = state.selectedItems.length

      state.selectedItems = state.selectedItems.filter(
        fullPath => fullPath !== item.fullPath,
      )

      const lengthAfter: number = state.selectedItems.length

      if (lengthBefore === lengthAfter) {
        state.selectedItems.push(item.fullPath)
      }
    },
  },
})

export default EditorFileModule

const EditorFileModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, EditorFileModule)
const EditorFileModuleActionContext = (context: any) => moduleActionContext(context, EditorFileModule)

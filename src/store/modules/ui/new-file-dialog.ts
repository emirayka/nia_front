import {NiaAction, NiaKey, NiaModifierDescription} from '@/utils'
import {defineModule} from 'direct-vuex'
import AddActionDialogModule from '@/store/modules/ui/add-action-dialog'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface NewFileDialogState {
  isShown: boolean,
  fileName: string,
  parentDirectoryPath: string
}

const NewFileDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    fileName: '',
    parentDirectoryPath: ''
  } as NewFileDialogState,
  getters: {
    isShown: (state: NewFileDialogState) => state.isShown,
    fileName: (state: NewFileDialogState) => state.fileName,
    parentDirectoryPath: (state: NewFileDialogState) => state.parentDirectoryPath,
  },
  mutations: {
    show: (state: NewFileDialogState) => {
      state.isShown = true
    },
    hide: (state: NewFileDialogState) => {
      state.isShown = false
    },
    setFileName: (state: NewFileDialogState, fileName: string) => {
      state.fileName = fileName
    },
    setParentDirectoryPath: (state: NewFileDialogState, path: string) => {
      state.parentDirectoryPath = path
    },
  },
})

export default NewFileDialogModule

const NewFileModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, NewFileDialogModule)
const NewFileModuleActionContext = (context: any) => moduleActionContext(context, NewFileDialogModule)

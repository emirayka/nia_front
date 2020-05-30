import {NiaAction, NiaKey, NiaModifierDescription} from '@/utils'
import {defineModule} from 'direct-vuex'
import AddActionDialogModule from '@/store/modules/ui/add-action-dialog'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface NewDirectoryDialogState {
  isShown: boolean,
  parentDirectoryPath: string,
  directoryName: string,
}

const NewDirectoryDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    parentDirectoryPath: '',
    directoryName: ''
  } as NewDirectoryDialogState,
  getters: {
    isShown: (state: NewDirectoryDialogState) => state.isShown,
    directoryName: (state: NewDirectoryDialogState) => state.directoryName,
    parentDirectoryPath: (state: NewDirectoryDialogState) => state.parentDirectoryPath,
  },
  mutations: {
    show: (state: NewDirectoryDialogState) => {
      state.isShown = true
    },
    hide: (state: NewDirectoryDialogState) => {
      state.isShown = false
    },
    setDirectoryName: (state: NewDirectoryDialogState, directoryName: string) => {
      state.directoryName = directoryName
    },
    setParentDirectoryPath: (state: NewDirectoryDialogState, path: string) => {
      state.parentDirectoryPath = path
    },
  },
})

export default NewDirectoryDialogModule

const NewDirectoryModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, NewDirectoryDialogModule)
const NewDirectoryModuleActionContext = (context: any) => moduleActionContext(context, NewDirectoryDialogModule)

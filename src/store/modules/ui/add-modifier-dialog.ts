import {NiaAction, NiaKey, NiaModifierDescription} from '@/utils'
import {defineModule} from 'direct-vuex'
import AddActionDialogModule from '@/store/modules/ui/add-action-dialog'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface AddModifierDialogState {
  isShown: boolean,
  selectedDevice: string,
  selectedKeyCode: number,
  selectedModifierAlias: string,
}

const AddModifierDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    selectedDevice: '',
    selectedKeyCode: -1,
    selectedModifierAlias: '',
  } as AddModifierDialogState,
  getters: {
    isShown: (state: AddModifierDialogState) => state.isShown,
    selectedDevice: (state: AddModifierDialogState) => state.selectedDevice,
    selectedKeyCode: (state: AddModifierDialogState) => state.selectedKeyCode,
    selectedModifierAlias: (state: AddModifierDialogState) => state.selectedModifierAlias,
  },
  mutations: {
    show: (state: AddModifierDialogState) => {
      state.isShown = true
    },
    hide: (state: AddModifierDialogState) => {
      state.isShown = false
    },

    setSelectedDeviceName: (state: AddModifierDialogState, name: string) => {
      state.selectedDevice = name
    },
    setSelectedKeyCode: (state: AddModifierDialogState, code: number) => {
      state.selectedKeyCode = code
    },
    setSelectedModifierAlias: (state: AddModifierDialogState, modifierAlias: string) => {
      state.selectedModifierAlias = modifierAlias
    },
  },
})

export default AddModifierDialogModule

const AddModifierModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, AddModifierDialogModule)
const AddModifierModuleActionContext = (context: any) => moduleActionContext(context, AddModifierDialogModule)

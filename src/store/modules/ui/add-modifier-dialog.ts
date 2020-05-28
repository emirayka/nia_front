import {NiaAction, NiaKey, NiaModifierDescription} from '@/utils'
import {defineModule} from 'direct-vuex'
import AddActionDialogModule from '@/store/modules/ui/add-action-dialog'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface AddModifierDialogState {
  isShown: boolean,
  selectedDeviceId: number,
  selectedKeyCode: number,
  selectedModifierAlias: string,
}

const AddModifierDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    selectedDeviceId: 0,
    selectedKeyCode: -1,
    selectedModifierAlias: '',
  } as AddModifierDialogState,
  getters: {
    isShown: (state: AddModifierDialogState) => state.isShown,
    selectedDeviceId: (state: AddModifierDialogState) => state.selectedDeviceId,
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

    setSelectedDeviceId: (state: AddModifierDialogState, id: number) => {
      state.selectedDeviceId = id
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

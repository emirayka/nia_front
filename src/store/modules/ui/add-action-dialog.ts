import { defineModule } from "direct-vuex"
import { moduleActionContext, moduleGetterContext } from "@/store"
import ServerInfoModule from '@/store/modules/keymapping/server-info'

export interface AddActionDialogState {
  isShown: boolean,
  selectedActionName: string,
}

const AddActionDialogModule = defineModule({
  namespaced: true,
  state: (): AddActionDialogState => {
    return {
      isShown: false,
      selectedActionName: '',
    }
  },
  getters: {
    addActionDialogIsShown: (state: AddActionDialogState) => state.isShown,
    addActionDialogSelectedActionName: (state: AddActionDialogState) => state.selectedActionName
  },
  mutations: {
    showAddActionDialog: (state: AddActionDialogState) => {
      state.isShown = true
    },
    hideAddActionDialog: (state: AddActionDialogState) => {
      state.isShown = false
    },
    setAddActionDialogSelectedActionName: (state: AddActionDialogState, name: string) => {
      state.selectedActionName = name
    }
  }
})

export default AddActionDialogModule

const AddActionModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, AddActionDialogModule)
const AddActionModuleActionContext = (context: any) => moduleActionContext(context, AddActionDialogModule)

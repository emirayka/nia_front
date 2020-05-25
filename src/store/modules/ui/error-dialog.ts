import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaKeyChord} from '@/utils'

export interface ErrorDialogState {
  isShown: boolean,
  errorMessage: string
}

const ErrorDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    errorMessage: '',
  } as ErrorDialogState,
  getters: {
    isShown: (state: ErrorDialogState) => state.isShown,
    errorMessage: (state: ErrorDialogState) => state.errorMessage,
  },
  mutations: {
    show: (state: ErrorDialogState, errorMessage: string) => {
      state.isShown = true
      state.errorMessage = errorMessage
    },
    hide: (state: ErrorDialogState) => {
      state.isShown = false
      state.errorMessage = ''
    },
  },
})

export default ErrorDialogModule

const ErrorModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ErrorDialogModule)
const ErrorModuleActionContext = (context: any) => moduleActionContext(context, ErrorDialogModule)

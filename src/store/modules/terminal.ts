import Vue from 'vue'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

import {getConfigDirectoryTree, TreePart} from '@/utils'
import {ExecutionResult} from '@/store/models'

type TerminalCommandHandler = (message: string) => void

export interface TerminalModuleState {
  handlers: Array<TerminalCommandHandler>
}

const TerminalModule = defineModule({
  namespaced: true as true,
  state: {
    handlers: []
  } as TerminalModuleState,
  mutations: {
    addHandler: (state: TerminalModuleState, handler: TerminalCommandHandler) => {
      state.handlers.push(handler)
    },
    resolve: (state: TerminalModuleState, result: ExecutionResult) => {
      const handler: TerminalCommandHandler | undefined = state.handlers.shift()

      if (handler === undefined) {
        return
      }

      let message: string = ''

      if (result.success) {
        message = `${result.result}`
      } else if (result.error) {
        message = `Error: ${result.result}`
      } else {
        message = `Failure: ${result.result}`
      }

      console.log(message)

      handler(message)
    },
  },
})

export default TerminalModule
const TerminalModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, TerminalModule)
const TerminalModuleActionContext = (context: any) => moduleActionContext(context, TerminalModule)

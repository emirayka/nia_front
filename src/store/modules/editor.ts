import {defineModule} from 'direct-vuex'
import {ExecutionResult} from '@/store/models'
import {moduleActionContext, moduleGetterContext} from '@/store'
import ConnectionModule from '@/store/modules/connection'

export interface EditorState {
  code: string,
  executionLog: Array<ExecutionResult>
}

const EditorModule = defineModule({
  namespaced: true as true,
  state: {
    code: '',
    executionLog: [],
  } as EditorState,
  getters: {
    code: (state: EditorState) => state.code,
    executionLog: (state: EditorState) => state.executionLog,
  },
  mutations: {
    setCode: (state: EditorState, code: string) => state.code = code,
    addExecutionResult(state: EditorState, executionResult: ExecutionResult) {
      const logItem: ExecutionResult = {
        success: false,
        error: false,
        failure: false,
        message: '',
      }

      if (executionResult.success) {
        logItem.success = true
        logItem.message = executionResult.message
      } else if (executionResult.error) {
        logItem.error = true
        logItem.message = executionResult.message
      } else if (executionResult.failure) {
        logItem.failure = true
        logItem.message = executionResult.message
      }

      state.executionLog.push(logItem)
    },
  },
})

export default EditorModule
const EditorModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, EditorModule)
const EditorModuleActionContext = (context: any) => moduleActionContext(context, EditorModule)

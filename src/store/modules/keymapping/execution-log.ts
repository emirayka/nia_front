import Vue from 'vue'
import {ExecutionResult} from '@/store/models'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import DevicesInfoModule from '@/store/modules/keymapping/devices-info'

export interface ExecutionLogModuleState {
  log: Array<ExecutionResult>
}

const ExecutionLogModule = defineModule({
  namespaced: true,
  state: {
    log: [],
  } as ExecutionLogModuleState,
  getters: {
  },
  mutations: {
    addExecutionResult(state: ExecutionLogModuleState, executionResult: ExecutionResult) {
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

      state.log.push(logItem)
    },
  },
})

export default ExecutionLogModule

const ExecutionLogModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ExecutionLogModule)
const ExecutionLogModuleActionContext = (context: any) => moduleActionContext(context, ExecutionLogModule)

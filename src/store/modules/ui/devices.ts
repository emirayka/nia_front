import loggers from '@/utils/logger'
const logger = loggers('NiaDevices')

import {NiaKey} from '@/utils'

import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface DevicesState {
  selectedKeys: Array<NiaKey>,
}

const DevicesModule = defineModule({
  namespaced: true,
  state: {
    selectedKeys: [],
  } as DevicesState,
  mutations: {
    selectKey: (state: DevicesState, key: NiaKey) => {
      state.selectedKeys = [
        key
      ]
    },
    toggleKeySelection: (state: DevicesState, key: NiaKey) => {
      for (const selectedKey of state.selectedKeys) {
        if (selectedKey.same(key)) {
          state.selectedKeys = state.selectedKeys
            .filter((selectedKey) => !selectedKey.same(key))
          return
        }
      }

      state.selectedKeys.push(key)
    },
    unselectKeys: (state: DevicesState) => {
      state.selectedKeys = []
    },
  },
  getters: {
    selectedKeys: (state: DevicesState) => state.selectedKeys,
  },
})

export default DevicesModule

const DevicesModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, DevicesModule)
const DevicesModuleActionContext = (context: any) => moduleActionContext(context, DevicesModule)

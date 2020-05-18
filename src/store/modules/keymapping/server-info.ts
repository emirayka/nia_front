import Vue from 'vue'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import ModifiersModule from '@/store/modules/keymapping/modifiers'

export interface ServerInfoModuleState {
  version: string
  info: string
}

const ServerInfoModule = defineModule({
  namespaced: true,
  state: {
    version: '',
    info: '',
  } as ServerInfoModuleState,
  getters: {
    version: (state: ServerInfoModuleState) => state.version,
    info: (state: ServerInfoModuleState) => state.info,
  },
  mutations: {
    setVersion(state: ServerInfoModuleState, version: string) {
      state.version = version
    },
    setInfo(state: ServerInfoModuleState, info: string) {
      state.info = info
    },
  },
})

export default ServerInfoModule

const ServerInfoModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ServerInfoModule)
const ServerInfoModuleActionContext = (context: any) => moduleActionContext(context, ServerInfoModule)

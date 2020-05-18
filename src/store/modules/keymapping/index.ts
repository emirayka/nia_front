import {defineModule} from 'direct-vuex'

import Actions from './actions'
import DevicesInfo from './devices-info'
import ExecutionLog from './execution-log'
import Modifiers from './modifiers'
import ServerInfo from './server-info'

import {moduleActionContext, moduleGetterContext} from '@/store'

const KeymappingModule = defineModule({
  namespaced: true,
  modules: {
    Actions,
    DevicesInfo,
    ExecutionLog,
    Modifiers,
    ServerInfo,
  }
})

export default KeymappingModule

const KeymappingModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, KeymappingModule)
const KeymappingModuleActionContext = (context: any) => moduleActionContext(context, KeymappingModule)

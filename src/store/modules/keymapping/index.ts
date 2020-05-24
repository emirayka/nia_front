import {defineModule} from 'direct-vuex'

import ServerInfo from './server-info'
import DevicesInfo from './devices-info'
import Modifiers from './modifiers'
import Actions from './actions'
import Mappings from './mappings'
import Listening from './listening'

import {moduleActionContext, moduleGetterContext} from '@/store'

const KeymappingModule = defineModule({
  namespaced: true,
  modules: {
    ServerInfo,
    DevicesInfo,
    Modifiers,
    Actions,
    Mappings,
    Listening,
  }
})

export default KeymappingModule

const KeymappingModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, KeymappingModule)
const KeymappingModuleActionContext = (context: any) => moduleActionContext(context, KeymappingModule)

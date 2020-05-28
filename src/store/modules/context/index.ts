import {defineModule} from 'direct-vuex'

import Action from './action-context-menu'
import ActionTable from './action-table-context-menu'
import Key from './key-context-menu'
import Device from './device-context-menu'
import Mapping from './mapping-context-menu'
import MappingTable from './mapping-table-context-menu'
import Modifier from './modifier-context-menu'
import ModifierTable from './modifier-table-context-menu'

import {moduleActionContext, moduleGetterContext} from '@/store'

const ContextModule = defineModule({
  namespaced: true,
  modules: {
    Action,
    ActionTable,
    Key,
    Device,
    Mapping,
    MappingTable,
    Modifier,
    ModifierTable,
  }
})

export default ContextModule

const ContextModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ContextModule)
const ContextModuleActionContext = (context: any) => moduleActionContext(context, ContextModule)

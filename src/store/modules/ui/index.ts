import AddActionDialog from './add-action-dialog'
import AddModifierDialog from './add-modifier-dialog'
import General from './general'

import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

const UIModule = defineModule({
  namespaced: true,
  modules: {
    AddActionDialog,
    AddModifierDialog,
    General,
  }
})

export default UIModule

const UIModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, UIModule)
const UIModuleActionContext = (context: any) => moduleActionContext(context, UIModule)

import AddActionDialog from './add-action-dialog'
import AddModifierDialog from './add-modifier-dialog'
import AddMappingDialog from './add-mapping-dialog'
import SelectedMappingInfoView from './selected-mapping-info-view'
import General from './general'

import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

const UIModule = defineModule({
  namespaced: true,
  modules: {
    AddActionDialog,
    AddModifierDialog,
    AddMappingDialog,
    SelectedMappingInfoView,
    General,
  }
})

export default UIModule

const UIModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, UIModule)
const UIModuleActionContext = (context: any) => moduleActionContext(context, UIModule)

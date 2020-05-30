import AddActionDialog from './add-action-dialog'
import AddModifierDialog from './add-modifier-dialog'
import AddMappingDialog from './add-mapping-dialog'
import EditorFileTree from './editor-file-tree'
import ErrorDialog from './error-dialog'
import NewFileDialog from './new-file-dialog'
import NewDirectoryDialog from './new-directory-dialog'
import SelectedMappingInfoView from './selected-mapping-info-view'

import Devices from './devices'
import ActionTable from './action-table'
import MappingTable from './mapping-table'
import ModifierTable from './modifier-table'

import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

const UIModule = defineModule({
  namespaced: true,
  modules: {
    AddActionDialog,
    AddModifierDialog,
    AddMappingDialog,
    EditorFileTree,
    ErrorDialog,
    NewFileDialog,
    NewDirectoryDialog,

    SelectedMappingInfoView,
    Devices,
    ActionTable,
    MappingTable,
    ModifierTable
  }
})

export default UIModule

const UIModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, UIModule)
const UIModuleActionContext = (context: any) => moduleActionContext(context, UIModule)

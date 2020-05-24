import loggers from '@/utils/logger'
const logger = loggers('General Module')

import {NiaAction, NiaDeviceInfo, NiaKey, NiaMapping, NiaModifierDescription, NiaNamedAction} from '@/utils'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import AddModifierDialogModule from '@/store/modules/ui/add-modifier-dialog'

export interface UIModuleState {
  selectedKeys: Array<NiaKey>,
  selectedModifiers: Array<NiaModifierDescription>,
  selectedActions: Array<NiaNamedAction>,
  selectedDevice: NiaDeviceInfo | null,
  selectedMapping: NiaMapping | null,
}

const GeneralModule = defineModule({
  namespaced: true,
  state: {
    selectedKeys: [],
    selectedModifiers: [],
    selectedActions: [],
    selectedDevice: null,
    selectedMapping: null,
  } as UIModuleState,
  mutations: {
    // keys
    toggleKeySelection: (state: UIModuleState, key: NiaKey) => {
      for (const selectedKey of state.selectedKeys) {
        if (selectedKey.equals(key)) {
          state.selectedKeys = state.selectedKeys
            .filter((selectedKey) => !selectedKey.equals(key))
          return
        }
      }

      state.selectedKeys.push(key)
    },
    unselectKeys: (state: UIModuleState) => {
      state.selectedKeys = []
    },

    // modifiers
    toggleModifierSelection: (state: UIModuleState, modifier: NiaModifierDescription) => {
      logger.debug('Got toggle modifier selection mutation:')
      logger.debug(modifier)

      for (const selectedModifier of state.selectedModifiers) {
        if (selectedModifier.equals(modifier)) {
          logger.debug('Unselected modifier.')

          state.selectedModifiers = state.selectedModifiers
            .filter((selectedModifier) => !selectedModifier.equals(modifier))
          return
        }
      }

      state.selectedModifiers.push(modifier)
      logger.debug('Selected modifier.')
    },
    unselectModifiers: (state: UIModuleState) => {
      state.selectedModifiers = []
    },

    // actions
    toggleActionSelection: (state: UIModuleState, action: NiaNamedAction) => {
      for (const selectedAction of state.selectedActions) {
        if (selectedAction.getActionName() === action.getActionName()) {
          state.selectedActions = state.selectedActions
            .filter((selectedAction) => selectedAction.getActionName() !== action.getActionName())
          return
        }
      }

      state.selectedActions.push(action)
    },
    unselectActions: (state: UIModuleState) => {
      state.selectedModifiers = []
    },

    // device
    selectDevice: (state: UIModuleState, device: NiaDeviceInfo) => {
      state.selectedDevice = device
    },

    // mapping
    selectMapping: (state: UIModuleState, mapping: NiaMapping) => {
      state.selectedMapping = mapping
    },
    unselectMapping: (state: UIModuleState) => {
      state.selectedMapping = null
    },
  },
  getters: {
    selectedKeys: (state: UIModuleState) => state.selectedKeys,
    selectedModifiers: (state: UIModuleState) => state.selectedModifiers,
    selectedActions: (state: UIModuleState) => state.selectedActions,
    selectedDevice: (state: UIModuleState) => state.selectedDevice,
    selectedMapping: (state: UIModuleState) => state.selectedMapping,
  },
})

export default GeneralModule

const GeneralModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, GeneralModule)
const GeneralModuleActionContext = (context: any) => moduleActionContext(context, GeneralModule)
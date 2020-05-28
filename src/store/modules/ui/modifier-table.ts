import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'
const logger = loggers('ModifierTable Module')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaModifierDescription} from '@/utils'

export interface ModifierTableState {
  selectedModifiers: Array<NiaModifierDescription>,
}

const ModifierTableModule = defineModule({
  namespaced: true,
  state: {
    selectedModifiers: [],
  } as ModifierTableState,
  mutations: {
    toggleModifierSelection: (state: ModifierTableState, modifier: NiaModifierDescription) => {
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
    selectModifier: (state: ModifierTableState, modifier: NiaModifierDescription) => {
      state.selectedModifiers = [
        modifier
      ]
    },
    unselectModifiers: (state: ModifierTableState) => {
      state.selectedModifiers = []
    },
  },
  getters: {
    selectedModifiers: (state: ModifierTableState) => state.selectedModifiers,
  },
})

export default ModifierTableModule

const ModifierTableModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ModifierTableModule)
const ModifierTableModuleActionContext = (context: any) => moduleActionContext(context, ModifierTableModule)

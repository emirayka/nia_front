import Vue from 'vue'
import {NiaAction, NiaKeyChord, NiaMapping} from '@/utils'
import {defineModule} from 'direct-vuex'

import {moduleActionContext, moduleGetterContext} from '@/store'

import loggers from '@/utils/logger'
const logger = loggers('store/Keymapping/Mappings')

export interface MappingsModuleState {
  definedMappings: Array<NiaMapping>,
}

const MappingsModule = defineModule({
  namespaced: true,
  state: {
    definedMappings: [],
  } as MappingsModuleState,
  getters: {
    definedMappings: (state: MappingsModuleState): Array<NiaMapping> => state.definedMappings,
  },
  mutations: {
    setMappings(state: MappingsModuleState, actions: Array<NiaMapping>) {
      state.definedMappings.splice(0)
      state.definedMappings.push(...actions)
    },
    defineMapping: (state: MappingsModuleState, mapping: NiaMapping) => {
      // todo: show error when action is already defined
      state.definedMappings.push(
        mapping,
      )
    },
    changeMapping: (state: MappingsModuleState, {keyChords, action}: {keyChords: Array<NiaKeyChord>, action: NiaAction}) => {
      // todo: show error when action is already defined
      for (const mapping of state.definedMappings) {
        if (NiaKeyChord.vectorsAreSame(mapping.getKeyChords(), keyChords)) {
          mapping.setAction(action)
        }
      }
    },
    removeMapping: (state: MappingsModuleState, keyChords: Array<NiaKeyChord>) => {
      // todo: show error when action is already defined
      let index: number = 0
      logger.debug('Trying to delete mappings with keychords:')
      logger.debug(keyChords)
      logger.debug('Searching')

      for (const mapping of state.definedMappings) {
        logger.debug(mapping.getKeyChords())
        if (NiaKeyChord.vectorsAreSame(mapping.getKeyChords(), keyChords)) {
          logger.debug('Found target mapping.')
          break
        }

        index += 1
      }

      if (index >= state.definedMappings.length) {
        logger.debug('Didn\'t find mapping.')
        return
      }

      logger.debug('Removing mapping.')
      state.definedMappings.splice(index, 1)
    },
  },
})

export default MappingsModule

const MappingsModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, MappingsModule)
const MappingsModuleActionContext = (context: any) => moduleActionContext(context, MappingsModule)

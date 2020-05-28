import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'
const logger = loggers('Mapping Table Module')

import {moduleActionContext, moduleGetterContext} from '@/store'

import {NiaMapping} from '@/utils'

export interface MappingTableState {
  selectedMappings: Array<NiaMapping>,
}

const MappingTableModule = defineModule({
  namespaced: true,
  state: {
    selectedMappings: [],
  } as MappingTableState,
  mutations: {
    selectMapping: (state: MappingTableState, mapping: NiaMapping) => {
      state.selectedMappings = [
        mapping,
      ]
    },
    unselectMapping: (state: MappingTableState) => {
      state.selectedMappings = []
    },
  },
  getters: {
    selectedMapping: (state: MappingTableState) => {
      return state.selectedMappings.length > 0
        ? state.selectedMappings[0]
        : null
    },
    noMappingIsSelected: (state: MappingTableState) => {
      return state.selectedMappings.length === 0
    }
  },
})

export default MappingTableModule

const MappingTableModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, MappingTableModule)
const MappingTableModuleActionContext = (context: any) => moduleActionContext(context, MappingTableModule)

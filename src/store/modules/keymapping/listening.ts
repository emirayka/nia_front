import Vue from 'vue'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import ModifiersModule from '@/store/modules/keymapping/modifiers'

export interface ListeningModuleState {
  listening: boolean,
}

const ListeningModule = defineModule({
  namespaced: true,
  state: {
    listening: false,
  } as ListeningModuleState,
  getters: {
    isListening: (state: ListeningModuleState) => state.listening
  },
  mutations: {
    setListening: (state: ListeningModuleState, listening: boolean) => state.listening = listening
  },
})

export default ListeningModule

const ListeningModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ListeningModule)
const ListeningModuleActionContext = (context: any) => moduleActionContext(context, ListeningModule)

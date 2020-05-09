import Vue from 'vue'
import Vuex from 'vuex'
import {createDirectStore} from 'direct-vuex'

import {
  KeymappingModuleState,
  KeymappingModule,
  ThemeModuleState,
  ThemeModule,
} from './modules'

Vue.use(Vuex)

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    KeymappingModule,
    ThemeModule,
  }
})

export default store
export {
  rootActionContext,
  moduleActionContext,
}

export type AppStore = typeof store

declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}

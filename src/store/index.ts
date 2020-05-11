import Vue from 'vue'
import Vuex from 'vuex'
import {createDirectStore} from 'direct-vuex'

import {
  KeymappingModuleState,
  KeymappingModule,
  ThemeModuleState,
  ThemeModule,
  UIModuleState,
  UIModule,
} from './modules'

Vue.use(Vuex)

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  modules: {
    KeymappingModule,
    ThemeModule,
    UIModule,
  },
})

export default store
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
}

export type AppStore = typeof store

declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}

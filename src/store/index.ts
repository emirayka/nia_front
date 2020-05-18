import Vue from 'vue'
import Vuex from 'vuex'
import {createDirectStore} from 'direct-vuex'

import {
  Connection,
  Keymapping,
  Theme,
  UI,
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
    Connection,
    Keymapping,
    Theme,
    UI,
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

import Vue from 'vue'
import Vuex from 'vuex'
import {createDirectStore} from 'direct-vuex'

import {
  Connection,
  File,
  FileConnection,
  Context,
  Editor,
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
    File,
    FileConnection,
    Context,
    Keymapping,
    Theme,
    UI,
    Editor,
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

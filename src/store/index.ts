import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: [],
    devicesInfo: [],
    version: '',
    info: '',
  },
  getters: {
    getDevices: (state) => state.devices,

    getDevicesInfo: (state) => state.devicesInfo,
    getVersion: (state) => state.version,
    getInfo: (state) => state.info,
  },
  mutations: {
    setDevices (state, devices) {
      state.devices = devices
    },
    setDevicesInfo (state, devicesInfo) {
      state.devicesInfo = devicesInfo
    },
    setVersion (state, version) {
      state.version = version
    },
    setInfo (state, info) {
      state.info = info
    },
  },
  actions: {},
  modules: {},
})

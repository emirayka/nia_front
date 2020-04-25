import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: [],
    devicesInfo: [],
    executionResult: null,
    code: '',
    log: [],
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
    setDevices(state, devices) {
      state.devices = devices
    },
    setDevicesInfo(state, devicesInfo) {
      state.devicesInfo = devicesInfo
    },
    setVersion(state, version) {
      state.version = version
    },
    setInfo(state, info) {
      state.info = info
    },
    setCode: function (state, code) {
      state.code = code
    },
    setExecutionResult(state, executionResult) {
      state.executionResult = executionResult

      const logItem = {
        success: false,
        error: false,
        failure: false,
        message: null,
      }

      if (executionResult.success) {
        logItem.success = true
        logItem.message = executionResult.result
      } else if (executionResult.error) {
        logItem.error = true
        logItem.message = executionResult.message
      } else if (executionResult.failure) {
        logItem.failure = true
        logItem.message = executionResult.message
      }

      state.log.push(logItem)
    },
  },
  actions: {},
  modules: {},
})

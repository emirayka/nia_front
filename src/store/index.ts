import Vue from 'vue'
import Vuex from 'vuex'
import {DeviceInfo, ExecutionResult, State} from '@/store/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: [],
    devicesInfo: [],
    code: '',
    log: [],
    version: '',
    info: '',
  } as State,
  getters: {
    getDevices: (state) => state.devices,

    getDevicesInfo: (state) => state.devicesInfo,
    getVersion: (state) => state.version,
    getInfo: (state) => state.info,
  },
  mutations: {
    setDevices(state, devices: Array<string>) {
      state.devices = devices
    },
    setDevicesInfo(state, devicesInfo: Array<DeviceInfo>) {
      state.devicesInfo = devicesInfo
    },
    setVersion(state, version: string) {
      state.version = version
    },
    setInfo(state, info: string) {
      state.info = info
    },
    setCode: function (state, code: string) {
      state.code = code
    },
    setExecutionResult(state, executionResult: ExecutionResult) {
      const logItem: ExecutionResult = {
        success: false,
        error: false,
        failure: false,
        message: '',
      }

      if (executionResult.success) {
        logItem.success = true
        logItem.message = executionResult.message
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

import {DeviceInfo, ExecutionResult} from '@/store/models'

export interface KeymappingModuleState {
  devices: Array<string>
  devicesInfo: Array<DeviceInfo>
  code: string
  log: Array<ExecutionResult>
  version: string
  info: string
}

export default {
  namespaced: true as true,
  state: {
    devices: [],
    devicesInfo: [],
    code: '',
    log: [],
    version: '',
    info: '',
  } as KeymappingModuleState,
  mutations: {
    setDevices(state: KeymappingModuleState, devices: Array<string>) {
      state.devices = devices
    },
    setDevicesInfo(state: KeymappingModuleState, devicesInfo: Array<DeviceInfo>) {
      console.log(devicesInfo)
      state.devicesInfo = devicesInfo
    },
    setVersion(state: KeymappingModuleState, version: string) {
      state.version = version
    },
    setInfo(state: KeymappingModuleState, info: string) {
      state.info = info
    },
    setCode: function (state: KeymappingModuleState, code: string) {
      state.code = code
    },
    setExecutionResult(state: KeymappingModuleState, executionResult: ExecutionResult) {
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
  getters: {
    getDevices: (state: KeymappingModuleState) => state.devices,

    getDevicesInfo: (state: KeymappingModuleState) => state.devicesInfo,
    getVersion: (state: KeymappingModuleState) => state.version,
    getInfo: (state: KeymappingModuleState) => state.info,
  },
}

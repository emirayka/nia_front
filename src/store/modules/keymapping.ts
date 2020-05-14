import {DeviceInfo, ExecutionResult} from '@/store/models'
import {Modifier} from '@/store/models/modifier'
import Vue from 'vue'

export interface KeymappingModuleState {
  devicesInfo: Array<DeviceInfo>
  modifiers: Array<Modifier>,
  code: string
  log: Array<ExecutionResult>
  version: string
  info: string
}

export default {
  namespaced: true as true,
  state: {
    devicesInfo: [],
    modifiers: [],
    code: '',
    log: [],
    version: '',
    info: '',
  } as KeymappingModuleState,
  mutations: {
    setModifiers(state: KeymappingModuleState, modifiers: Array<Modifier>) {
      state.modifiers.splice(0)
      state.modifiers.push(...modifiers)
    },
    setDevicesInfo(state: KeymappingModuleState, devicesInfo: Array<DeviceInfo>) {
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
    makeKeyboardDefined(state: KeymappingModuleState, keyboardPath: string) {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.path === keyboardPath) {
          deviceInfo.defined = true
          break
        }
      }
    },
    makeKeyboardRemoved(state: KeymappingModuleState, keyboardPath: string) {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.path === keyboardPath) {
          deviceInfo.defined = false
          break
        }
      }
    },
    defineModifier: (state: KeymappingModuleState, modifier: Modifier) => {
      // todo: show error when modifier is already defined
      state.modifiers.push(
        modifier
      )
    },
    removeModifier: (state: KeymappingModuleState, selectedModifier: Modifier) => {
      state.modifiers = state.modifiers.filter(
        (modifier) => modifier.keyboardKey.keyCode != selectedModifier.keyboardKey.keyCode ||
          modifier.keyboardKey.keyboardPath != selectedModifier.keyboardKey.keyboardPath
      )
    },
  },
  getters: {
    keyboards: (state: KeymappingModuleState) => state.devicesInfo,
    modifiers: (state: KeymappingModuleState) => state.modifiers,
    version: (state: KeymappingModuleState) => state.version,
    info: (state: KeymappingModuleState) => state.info,

    keyboardNames: (state: KeymappingModuleState) => {
      return state.devicesInfo
        .map((deviceInfo: DeviceInfo) => deviceInfo.name)
    },

    getKeyboardPathByName: (state: KeymappingModuleState) => (keyboardName: string) => {
      const filtered: Array<DeviceInfo> = state.devicesInfo
        .filter((deviceInfo: DeviceInfo) => deviceInfo.name === keyboardName)

      return filtered.length > 0
        ? filtered[0].path
        : null
    },

    getKeyboardByName: (state: KeymappingModuleState) => (keyboardName: string) => {
      let filtered: Array<DeviceInfo> = state
        .devicesInfo
        .filter((deviceInfo: DeviceInfo) => deviceInfo.name === keyboardName)

      return filtered.length > 0
        ? filtered[0]
        : null
    },

    getKeyboardByPath: (state: KeymappingModuleState) => (keyboardPath: string) => {
      let filtered: Array<DeviceInfo> = state
        .devicesInfo
        .filter((deviceInfo: DeviceInfo) => deviceInfo.path === keyboardPath)

      return filtered.length > 0
        ? filtered[0]
        : null
    },

    isKeyboardDefined: (state: KeymappingModuleState) => (keyboardPath: string) => {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.path === keyboardPath) {
          return deviceInfo.defined
        }
      }

      return null
    },
    isModifierAlreadyDefined: (state: KeymappingModuleState) => (keyboardPath: string, keyCode: number) => {
      for (const modifier of state.modifiers) {
        if (modifier.keyboardKey.keyCode === keyCode && modifier.keyboardKey.keyboardPath == keyboardPath) {
          return true
        }
      }

      return false
    },
  },
}

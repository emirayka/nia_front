import Vue from 'vue'

import {ExecutionResult} from '@/store/models'
import {NiaAction, NiaDeviceInfo, NiaKey, NiaModifierDescription} from '@/utils'

export interface KeymappingModuleState {
  devicesInfo: Array<NiaDeviceInfo>
  definedModifiers: Array<NiaModifierDescription>,
  definedActions: Array<NiaAction>,
  code: string
  log: Array<ExecutionResult>
  version: string
  info: string
}

export default {
  namespaced: true as true,
  state: {
    devicesInfo: [],
    definedModifiers: [],
    definedActions: [],
    code: '',
    log: [],
    version: '',
    info: '',
  } as KeymappingModuleState,
  mutations: {
    setActions(state: KeymappingModuleState, actions: Array<NiaAction>) {
      state.definedActions.splice(0)
      state.definedActions.push(...actions)
    },
    setModifiers(state: KeymappingModuleState, modifiers: Array<NiaModifierDescription>) {
      state.definedModifiers.splice(0)
      state.definedModifiers.push(...modifiers)
    },
    setDevicesInfo(state: KeymappingModuleState, devicesInfo: Array<NiaDeviceInfo>) {
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
    makeDeviceDefined(state: KeymappingModuleState, deviceId: number) {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.getDeviceId() === deviceId) {
          deviceInfo.setDefined(true)
          break
        }
      }
    },
    makeDeviceRemoved(state: KeymappingModuleState, devicePath: string) {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.getDevicePath() === devicePath) {
          deviceInfo.setDefined(false)
          break
        }
      }
    },
    defineModifier: (state: KeymappingModuleState, modifier: NiaModifierDescription) => {
      // todo: show error when modifier is already defined
      state.definedModifiers.push(
        modifier
      )
    },
    removeModifier: (state: KeymappingModuleState, selectedModifierKey: NiaKey) => {
      state.definedModifiers = state.definedModifiers.filter(
        (modifier) => !modifier.getKey().equals(selectedModifierKey)
      )
    },
    defineAction: (state: KeymappingModuleState, action: NiaAction) => {
      // todo: show error when action is already defined
      state.definedActions.push(
        action
      )
    },
    removeAction: (state: KeymappingModuleState, selectedAction: NiaAction) => {
      state.definedActions = state.definedActions.filter(
        (action) => action.getActionName() !== selectedAction.getActionName()
      )
    },
  },
  getters: {
    devices: (state: KeymappingModuleState) => state.devicesInfo,
    definedModifiers: (state: KeymappingModuleState) => state.definedModifiers,
    definedActions: (state: KeymappingModuleState) => state.definedActions,
    version: (state: KeymappingModuleState) => state.version,
    info: (state: KeymappingModuleState) => state.info,

    deviceNames: (state: KeymappingModuleState) => {
      return state.devicesInfo
        .map((deviceInfo: NiaDeviceInfo) => deviceInfo.getDeviceName())
    },

    getDevicePathByName: (state: KeymappingModuleState) => (deviceName: string) => {
      const filtered: Array<NiaDeviceInfo> = state.devicesInfo
        .filter((deviceInfo: NiaDeviceInfo) => deviceInfo.getDeviceName() === deviceName)

      return filtered.length > 0
        ? filtered[0].getDevicePath()
        : null
    },
    getDeviceById: (state: KeymappingModuleState) => (deviceId: number) => {
      let filtered: Array<NiaDeviceInfo> = state
        .devicesInfo
        .filter((deviceInfo: NiaDeviceInfo) => deviceInfo.getDeviceId() === deviceId)

      return filtered.length > 0
        ? filtered[0]
        : null
    },

    getDeviceByName: (state: KeymappingModuleState) => (deviceName: string) => {
      let filtered: Array<NiaDeviceInfo> = state
        .devicesInfo
        .filter((deviceInfo: NiaDeviceInfo) => deviceInfo.getDeviceName() === deviceName)

      return filtered.length > 0
        ? filtered[0]
        : null
    },

    getDeviceByPath: (state: KeymappingModuleState) => (deviceName: string) => {
      let filtered: Array<NiaDeviceInfo> = state
        .devicesInfo
        .filter((deviceInfo: NiaDeviceInfo) => deviceInfo.getDevicePath() === deviceName)

      return filtered.length > 0
        ? filtered[0]
        : null
    },

    isDeviceDefined: (state: KeymappingModuleState) => (devicePath: string) => {
      for (let deviceInfo of state.devicesInfo) {
        if (deviceInfo.getDevicePath() === devicePath) {
          return deviceInfo.isDefined
        }
      }

      return null
    },
    isModifierAlreadyDefined: (state: KeymappingModuleState) => (deviceId: number, keyCode: number) => {
      for (const modifier of state.definedModifiers) {
        if (modifier.getKey().getKeyCode() === keyCode && modifier.getKey().getDeviceId() == deviceId) {
          return true
        }
      }

      return false
    },
  },
}

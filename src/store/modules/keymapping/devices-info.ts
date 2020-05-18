import Vue from 'vue'

import {NiaDeviceInfo} from '@/utils'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import ConnectionModule from '@/store/modules/connection'

export interface KeymappingModuleState {
  devicesInfo: Array<NiaDeviceInfo>
}

const DevicesInfoModule = defineModule({
  namespaced: true,
  state: {
    devicesInfo: [],
  } as KeymappingModuleState,
  getters: {
    devices: (state: KeymappingModuleState) => state.devicesInfo,

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
  },
  mutations: {
    setDevicesInfo(state: KeymappingModuleState, devicesInfo: Array<NiaDeviceInfo>) {
      state.devicesInfo = devicesInfo
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
  },
})

export default DevicesInfoModule

const DevicesInfoModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, DevicesInfoModule)
const DevicesInfoModuleActionContext = (context: any) => moduleActionContext(context, DevicesInfoModule)

import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/deviceInfo')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaDeviceInfo, NiaKey} from '@/utils'

export interface DeviceContextMenuState {
  shown: boolean;
  deviceInfo: NiaDeviceInfo | null;
  x: number;
  y: number;
}

const DeviceContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    deviceInfo: null,
    x: 0,
    y: 0,
  } as DeviceContextMenuState,
  mutations: {
    show: (state: DeviceContextMenuState) => {
      state.shown = true
    },
    setDevice: (state: DeviceContextMenuState, deviceInfo: NiaDeviceInfo) => {
      state.deviceInfo = deviceInfo
    },
    setX: (state: DeviceContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: DeviceContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: DeviceContextMenuState) => {
      state.shown = false
      state.deviceInfo = null
    },
  },
  getters: {
    shown: (state: DeviceContextMenuState) => state.shown,
    deviceInfo: (state: DeviceContextMenuState) => state.deviceInfo,
    x: (state: DeviceContextMenuState) => state.x,
    y: (state: DeviceContextMenuState) => state.y,
  },
})

export default DeviceContextMenuModule

const DeviceContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, DeviceContextMenuModule)
const DeviceContextMenuModuleActionContext = (context: any) => moduleActionContext(context, DeviceContextMenuModule)

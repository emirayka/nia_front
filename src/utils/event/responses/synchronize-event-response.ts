import {
  Modifier,
  KeyboardModel,
  DeviceInfo
} from '@/store/models'

import {
  NiaSynchronizeEvent,
  NiaHandshakeResult,
  NiaGetDeviceInfoResult,
  NiaEventResponse, NiaGetDefinedModifiersResult,
} from '@/utils'
import SerializableObject from '../../serializableObj'

export interface NiaSynchronizeEventResponseSerialized {
  version: string,
  info: string,
  devicesInfo: Array<DeviceInfo>,
  definedModifiers: Array<Modifier>
}

export class NiaSynchronizeEventResponse implements SerializableObject<NiaSynchronizeEventResponse, NiaSynchronizeEventResponseSerialized> {
  private readonly version: string
  private readonly info: string
  private readonly devicesInfo: Array<DeviceInfo>
  private readonly definedModifiers: Array<Modifier>

  constructor(version: string, info: string, devicesInfo: Array<DeviceInfo>, definedModifiers: Array<Modifier>) {
    this.version = version
    this.info = info
    this.devicesInfo = devicesInfo
    this.definedModifiers = definedModifiers
  }

  static from(
    synchronizeEvent: NiaSynchronizeEvent,
    handshakeResult: NiaHandshakeResult,
    getDeviceInfoResults: Array<NiaGetDeviceInfoResult>,
    getDefinedModifiersResult: NiaGetDefinedModifiersResult
  ): NiaSynchronizeEventResponse {
    const version: string = handshakeResult.getVersion()
    const info: string = handshakeResult.getInfo()
    const devicesInfo: Array<DeviceInfo> = getDeviceInfoResults.map((getDeviceInfoResult: NiaGetDeviceInfoResult) => {
      const deviceInfo: DeviceInfo = {
        name: getDeviceInfoResult.getName(),
        path: getDeviceInfoResult.getPath(),
        model: JSON.parse(getDeviceInfoResult.getModel()) as KeyboardModel,
        defined: false // todo: fix
      }

      return deviceInfo
    })
    const definedModifiers: Array<Modifier> = getDefinedModifiersResult.getDefinedModifiers()

    return new NiaSynchronizeEventResponse(
      version,
      info,
      devicesInfo,
      definedModifiers
    )
  }

  getVersion(): string {
    return this.version
  }

  getInfo(): string {
    return this.info
  }

  getDevicesInfo(): Array<DeviceInfo> {
    return this.devicesInfo
  }

  getDefinedModifiers(): Array<Modifier> {
    return this.definedModifiers
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(serialized: NiaSynchronizeEventResponseSerialized): NiaSynchronizeEventResponse {
    return new NiaSynchronizeEventResponse(
      serialized.version,
      serialized.info,
      serialized.devicesInfo,
      serialized.definedModifiers
    )
  }

  serialize(): NiaSynchronizeEventResponseSerialized {
    return {
      version: this.version,
      info: this.info,
      devicesInfo: this.devicesInfo,
      definedModifiers: this.definedModifiers
    }
  }
}

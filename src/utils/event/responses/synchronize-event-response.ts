import {
  NiaSynchronizeEvent,
  NiaEventResponse,
  NiaModifierDescription,
  NiaDeviceInfo,
  NiaHandshakeResponse,
  NiaGetDefinedModifiersResponse,
  NiaGetDevicesResponse,
  NiaDeviceInfoSerialized,
  NiaModifierDescriptionSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaSynchronizeEventResponseObject {
  version: string,
  info: string,
  devicesInfo: Array<NiaDeviceInfo>,
  definedModifiers: Array<NiaModifierDescription>
}

export interface NiaSynchronizeEventResponseSerialized {
  version: string,
  info: string,
  devicesInfo: Array<NiaDeviceInfoSerialized>,
  definedModifiers: Array<NiaModifierDescriptionSerialized>
}

export class NiaSynchronizeEventResponse implements SerializableObject<NiaSynchronizeEventResponse, NiaSynchronizeEventResponseSerialized> {
  private readonly version: string
  private readonly info: string
  private readonly devicesInfo: Array<NiaDeviceInfo>
  private readonly definedModifiers: Array<NiaModifierDescription>

  constructor(args: NiaSynchronizeEventResponseObject) {
    this.version = args.version
    this.info = args.info
    this.devicesInfo = args.devicesInfo
    this.definedModifiers = args.definedModifiers
  }

  static from(synchronizeEvent: NiaSynchronizeEvent,
              handshakeResponse: NiaHandshakeResponse,
              getDevicesResponse: NiaGetDevicesResponse,
              getDefinedModifiersResponse: NiaGetDefinedModifiersResponse): NiaSynchronizeEventResponse {
    const args: NiaSynchronizeEventResponseObject = {
      version: handshakeResponse.getVersion(),
      info: handshakeResponse.getInfo(),
      devicesInfo: getDevicesResponse.getDevices(),
      definedModifiers: getDefinedModifiersResponse.getModifierDescriptions(),
    }

    return new NiaSynchronizeEventResponse(args)
  }

  getVersion(): string {
    return this.version
  }

  getInfo(): string {
    return this.info
  }

  getDevicesInfo(): Array<NiaDeviceInfo> {
    return this.devicesInfo
  }

  getDefinedModifiers(): Array<NiaModifierDescription> {
    return this.definedModifiers
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(obj: NiaSynchronizeEventResponseSerialized): NiaSynchronizeEventResponse {
    const args: NiaSynchronizeEventResponseObject = {
      version: obj.version,
      info: obj.info,
      devicesInfo: obj
        .devicesInfo
        .map((deviceInfo) => NiaDeviceInfo.deserialize(deviceInfo)),
      definedModifiers: obj
        .definedModifiers
        .map((modifier) => NiaModifierDescription.deserialize(modifier)),
    }

    return new NiaSynchronizeEventResponse(args)
  }

  serialize(): NiaSynchronizeEventResponseSerialized {
    return {
      version: this.version,
      info: this.info,
      devicesInfo: this.devicesInfo.map((deviceInfo) => deviceInfo.serialize()),
      definedModifiers: this.definedModifiers.map((modifier) => modifier.serialize()),
    }
  }
}

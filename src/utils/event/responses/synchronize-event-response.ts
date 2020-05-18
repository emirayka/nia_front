import {
  NiaSynchronizeEvent,
  NiaEventResponse,
  NiaModifierDescription,
  NiaDeviceInfo,
  NiaHandshakeResponse,
  NiaGetDefinedModifiersResponse,
  NiaGetDevicesResponse,
  NiaDeviceInfoSerialized,
  NiaModifierDescriptionSerialized, NiaAction, NiaActionSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'
import {NiaGetDefinedActionsResponse} from '@/utils/protocol/responses/get-defined-actions-request'

export interface NiaSynchronizeEventResponseObject {
  version: string,
  info: string,
  devicesInfo: Array<NiaDeviceInfo>,
  definedModifiers: Array<NiaModifierDescription>
  definedActions: Array<NiaAction>
}

export interface NiaSynchronizeEventResponseSerialized {
  version: string,
  info: string,
  devicesInfo: Array<NiaDeviceInfoSerialized>,
  definedModifiers: Array<NiaModifierDescriptionSerialized>
  definedActions: Array<NiaActionSerialized>
}

export class NiaSynchronizeEventResponse implements SerializableObject<NiaSynchronizeEventResponse, NiaSynchronizeEventResponseSerialized> {
  private readonly version: string
  private readonly info: string
  private readonly devicesInfo: Array<NiaDeviceInfo>
  private readonly definedModifiers: Array<NiaModifierDescription>
  private readonly definedActions: Array<NiaAction>

  constructor(args: NiaSynchronizeEventResponseObject) {
    this.version = args.version
    this.info = args.info
    this.devicesInfo = args.devicesInfo
    this.definedModifiers = args.definedModifiers
    this.definedActions = args.definedActions
  }

  static from(synchronizeEvent: NiaSynchronizeEvent,
              handshakeResponse: NiaHandshakeResponse,
              getDevicesResponse: NiaGetDevicesResponse,
              getDefinedModifiersResponse: NiaGetDefinedModifiersResponse,
              getDefinedActionsResponse: NiaGetDefinedActionsResponse,
  ): NiaSynchronizeEventResponse {

    const args: NiaSynchronizeEventResponseObject = {
      version: handshakeResponse.getVersion(),
      info: handshakeResponse.getInfo(),
      devicesInfo: getDevicesResponse.getDevices(),
      definedModifiers: getDefinedModifiersResponse.getModifierDescriptions(),
      definedActions: getDefinedActionsResponse.getActions(),
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

  getDefinedActions(): Array<NiaAction> {
    return this.definedActions
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
      definedActions: obj
        .definedActions
        .map((action) => NiaAction.deserialize(action)),
    }

    return new NiaSynchronizeEventResponse(args)
  }

  serialize(): NiaSynchronizeEventResponseSerialized {
    return {
      version: this.version,
      info: this.info,
      devicesInfo: this.devicesInfo.map((deviceInfo) => deviceInfo.serialize()),
      definedModifiers: this.definedModifiers.map((modifier) => modifier.serialize()),
      definedActions: this.definedActions.map((action) => action.serialize()),
    }
  }
}

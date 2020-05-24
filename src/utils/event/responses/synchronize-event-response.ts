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
  NiaAction,
  NiaActionSerialized,
  NiaGetDefinedActionsResponse,
  NiaMapping,
  NiaMappingSerialized,
  NiaGetDefinedMappingsResponse,
  NiaNamedActionSerialized, NiaNamedAction,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'
import {NiaIsListeningResponse} from '@/utils/protocol/responses/is-listening-response'

export interface NiaSynchronizeEventResponseObject {
  version: string,
  info: string,
  listening: boolean

  devicesInfo: Array<NiaDeviceInfo>,
  definedModifiers: Array<NiaModifierDescription>
  definedActions: Array<NiaNamedAction>
  definedMappings: Array<NiaMapping>
}

export interface NiaSynchronizeEventResponseSerialized {
  version: string,
  info: string,
  listening: boolean

  devicesInfo: Array<NiaDeviceInfoSerialized>,
  definedModifiers: Array<NiaModifierDescriptionSerialized>
  definedActions: Array<NiaNamedActionSerialized>
  definedMappings: Array<NiaMappingSerialized>
}

export class NiaSynchronizeEventResponse implements SerializableObject<NiaSynchronizeEventResponse, NiaSynchronizeEventResponseSerialized> {
  private readonly version: string
  private readonly info: string
  private readonly listening: boolean

  private readonly devicesInfo: Array<NiaDeviceInfo>
  private readonly definedModifiers: Array<NiaModifierDescription>
  private readonly definedActions: Array<NiaNamedAction>
  private readonly definedMappings: Array<NiaMapping>

  constructor(args: NiaSynchronizeEventResponseObject) {
    this.version = args.version
    this.info = args.info
    this.listening = args.listening

    this.devicesInfo = args.devicesInfo
    this.definedModifiers = args.definedModifiers
    this.definedActions = args.definedActions
    this.definedMappings = args.definedMappings
  }

  static from(synchronizeEvent: NiaSynchronizeEvent,
              handshakeResponse: NiaHandshakeResponse,
              isListeningResponse: NiaIsListeningResponse,
              getDevicesResponse: NiaGetDevicesResponse,
              getDefinedModifiersResponse: NiaGetDefinedModifiersResponse,
              getDefinedActionsResponse: NiaGetDefinedActionsResponse,
              getDefinedMappingsResponse: NiaGetDefinedMappingsResponse,
  ): NiaSynchronizeEventResponse {

    const args: NiaSynchronizeEventResponseObject = {
      version: handshakeResponse.getVersion(),
      info: handshakeResponse.getInfo(),
      listening: isListeningResponse.isListening(),

      devicesInfo: getDevicesResponse.getDevices(),
      definedModifiers: getDefinedModifiersResponse.getModifierDescriptions(),
      definedActions: getDefinedActionsResponse.getNamedActions(),
      definedMappings: getDefinedMappingsResponse.getMappings(),
    }

    return new NiaSynchronizeEventResponse(args)
  }

  getVersion(): string {
    return this.version
  }

  getInfo(): string {
    return this.info
  }

  isListening(): boolean {
    return this.listening
  }

  getDevicesInfo(): Array<NiaDeviceInfo> {
    return this.devicesInfo
  }

  getDefinedModifiers(): Array<NiaModifierDescription> {
    return this.definedModifiers
  }

  getDefinedActions(): Array<NiaNamedAction> {
    return this.definedActions
  }

  getDefinedMappings(): Array<NiaMapping> {
    return this.definedMappings
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(obj: NiaSynchronizeEventResponseSerialized): NiaSynchronizeEventResponse {
    const args: NiaSynchronizeEventResponseObject = {
      version: obj.version,
      info: obj.info,
      listening: obj.listening,

      devicesInfo: obj
        .devicesInfo
        .map((deviceInfo) => NiaDeviceInfo.deserialize(deviceInfo)),
      definedModifiers: obj
        .definedModifiers
        .map((modifier) => NiaModifierDescription.deserialize(modifier)),
      definedActions: obj
        .definedActions
        .map((action) => NiaNamedAction.deserialize(action)),
      definedMappings: obj
        .definedMappings
        .map((mapping) => NiaMapping.deserialize(mapping)),
    }

    return new NiaSynchronizeEventResponse(args)
  }

  serialize(): NiaSynchronizeEventResponseSerialized {
    return {
      version: this.version,
      info: this.info,
      listening: this.listening,

      devicesInfo: this.devicesInfo.map((deviceInfo) => deviceInfo.serialize()),
      definedModifiers: this.definedModifiers.map((modifier) => modifier.serialize()),
      definedActions: this.definedActions.map((action) => action.serialize()),
      definedMappings: this.definedMappings.map((mapping) => mapping.serialize()),
    }
  }
}

import {
  NiaDefineDeviceEvent,
  NiaDefineDeviceEventResponse,
  NiaDefineKeyboardEventResponseObject,
  NiaDefineDeviceEventObject,
  NiaDefineModifierEvent,
  NiaDefineModifierEventResponse,
  NiaDefineModifierEventResponseObject,
  NiaDefineModifierEventObject,
  NiaEventSerialized,
  NiaEventType,
  NiaExecuteCodeEvent,
  NiaExecuteCodeEventResponse,
  NiaExecuteCodeEventResponseObject,
  NiaExecuteCodeEventObject,
  NiaRemoveDeviceEvent,
  NiaRemoveDeviceEventResponse,
  NiaRemoveDeviceResponseObject,
  NiaRemoveDeviceEventObject,
  NiaRemoveModifierEvent,
  NiaRemoveModifierEventResponse,
  NiaRemoveModifierEventResponseObject,
  NiaRemoveModifierEventObject,
  NiaSynchronizeEvent,
  NiaSynchronizeEventResponse,
  NiaSynchronizeEventResponseObject,
  NiaSynchronizeEventObject,
  NiaDefineKeyboardEventResponseSerialized,
  NiaDefineModifierEventResponseSerialized,
  NiaSynchronizeEventResponseSerialized,
  NiaExecuteCodeEventResponseSerialized, NiaRemoveDeviceResponseSerialized, NiaRemoveModifierEventResponseSerialized,
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export enum NiaEventResponseType {
  NiaDefineKeyboardEventResponse,
  NiaDefineModifierEventResponse,
  NiaExecuteCodeEventResponse,
  NiaRemoveKeyboardEventResponse,
  NiaRemoveModifierEventResponse,
  NiaSynchronizeEventResponse
}

export type NiaEventResponseUnderlyingType =
  NiaDefineDeviceEventResponse |
  NiaDefineModifierEventResponse |
  NiaExecuteCodeEventResponse |
  NiaRemoveDeviceEventResponse |
  NiaRemoveModifierEventResponse |
  NiaSynchronizeEventResponse

export type NiaEventResponseUnderlyingTypeSerialized =
  NiaDefineKeyboardEventResponseSerialized |
  NiaDefineModifierEventResponseSerialized |
  NiaExecuteCodeEventResponseSerialized |
  NiaRemoveDeviceResponseSerialized |
  NiaRemoveModifierEventResponseSerialized |
  NiaSynchronizeEventResponseSerialized

export interface NiaEventResponseSerialized {
  eventResponse: NiaEventResponseUnderlyingTypeSerialized,
  eventType: NiaEventResponseType
}

export class NiaEventResponse implements SerializableObject<NiaEventResponse, NiaEventResponseSerialized> {
  private readonly event: NiaEventResponseUnderlyingType

  constructor(event: NiaEventResponseUnderlyingType) {
    this.event = event
  }

  isDefineKeyboardEventResponse(): boolean {
    return this.event instanceof NiaDefineDeviceEventResponse
  }

  isDefineModifierEventResponse(): boolean {
    return this.event instanceof NiaDefineModifierEventResponse
  }

  isExecuteCodeEventResponse(): boolean {
    return this.event instanceof NiaExecuteCodeEventResponse
  }

  isRemoveKeyboardEventResponse(): boolean {
    return this.event instanceof NiaRemoveDeviceEventResponse
  }

  isRemoveModifierEventResponse(): boolean {
    return this.event instanceof NiaRemoveModifierEventResponse
  }

  isSynchronizeEventResponse(): boolean {
    return this.event instanceof NiaSynchronizeEventResponse
  }

  takeDefineKeyboardEventResponse(): NiaDefineDeviceEventResponse {
    return this.event as NiaDefineDeviceEventResponse
  }

  takeDefineModifierEventResponse(): NiaDefineModifierEventResponse {
    return this.event as NiaDefineModifierEventResponse
  }

  takeExecuteCodeEventResponse(): NiaExecuteCodeEventResponse {
    return this.event as NiaExecuteCodeEventResponse
  }

  takeRemoveKeyboardEventResponse(): NiaRemoveDeviceEventResponse {
    return this.event as NiaRemoveDeviceEventResponse
  }

  takeRemoveModifierEventResponse(): NiaRemoveModifierEventResponse {
    return this.event as NiaRemoveModifierEventResponse
  }

  takeSynchronizeEventResponse(): NiaSynchronizeEventResponse {
    return this.event as NiaSynchronizeEventResponse
  }

  static deserialize(serialized: NiaEventResponseSerialized): NiaEventResponse {
    switch (serialized.eventType) {
      case NiaEventResponseType.NiaDefineKeyboardEventResponse:
        const defineKeyboardEventResponseSerialized = serialized.eventResponse as NiaDefineKeyboardEventResponseSerialized
        const defineKeyboardEventResponse = NiaDefineDeviceEventResponse.deserialize(defineKeyboardEventResponseSerialized)
        return new NiaEventResponse(defineKeyboardEventResponse)

      case NiaEventResponseType.NiaDefineModifierEventResponse:
        const defineModifierEventResponseSerialized = serialized.eventResponse as NiaDefineModifierEventResponseSerialized
        const defineModifierEventResponse = NiaDefineModifierEventResponse.deserialize(defineModifierEventResponseSerialized)
        return new NiaEventResponse(defineModifierEventResponse)

      case NiaEventResponseType.NiaExecuteCodeEventResponse:
        const executeCodeEventResponseSerialized = serialized.eventResponse as NiaExecuteCodeEventResponseSerialized
        const executeCodeEventResponse = NiaExecuteCodeEventResponse.deserialize(executeCodeEventResponseSerialized)
        return new NiaEventResponse(executeCodeEventResponse)

      case NiaEventResponseType.NiaRemoveKeyboardEventResponse:
        const removeKeyboardEventResponseSerialized = serialized.eventResponse as NiaRemoveDeviceResponseSerialized
        const removeKeyboardEventResponse = NiaRemoveDeviceEventResponse.deserialize(removeKeyboardEventResponseSerialized)
        return new NiaEventResponse(removeKeyboardEventResponse)

      case NiaEventResponseType.NiaRemoveModifierEventResponse:
        const removeModifierEventResponseSerialized = serialized.eventResponse as NiaRemoveModifierEventResponseSerialized
        const removeModifierEventResponse = NiaRemoveModifierEventResponse.deserialize(removeModifierEventResponseSerialized)
        return new NiaEventResponse(removeModifierEventResponse)

      case NiaEventResponseType.NiaSynchronizeEventResponse:
        const synchronizeEventResponseSerialized = serialized.eventResponse as NiaSynchronizeEventResponseSerialized
        const synchronizeEventResponse = NiaSynchronizeEventResponse.deserialize(synchronizeEventResponseSerialized)
        return new NiaEventResponse(synchronizeEventResponse)

      default:
        throw new Error('Unknown event type.')
    }
  }

  serialize(): NiaEventResponseSerialized {
    // todo: probably remove type as type casting, because they may be unnecessary
    if (this.event instanceof NiaDefineDeviceEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaDefineKeyboardEventResponse,
        eventResponse: (this.event as NiaDefineDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaDefineModifierEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaDefineModifierEventResponse,
        eventResponse: (this.event as NiaDefineModifierEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaExecuteCodeEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaExecuteCodeEventResponse,
        eventResponse: (this.event as NiaExecuteCodeEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveDeviceEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaRemoveKeyboardEventResponse,
        eventResponse: (this.event as NiaRemoveDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveModifierEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaRemoveModifierEventResponse,
        eventResponse: (this.event as NiaRemoveModifierEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaSynchronizeEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaSynchronizeEventResponse,
        eventResponse: (this.event as NiaSynchronizeEventResponse).serialize(),
      }
    } else {
      throw new Error('Unknown event to serialize.')
    }
  }

}

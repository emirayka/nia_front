import {
  NiaDefineKeyboardEvent,
  NiaDefineKeyboardEventResponse,
  NiaDefineKeyboardEventResponseSerialized,
  NiaDefineKeyboardEventSerialized,
  NiaDefineModifierEvent,
  NiaDefineModifierEventResponse,
  NiaDefineModifierEventResponseSerialized, NiaDefineModifierEventSerialized, NiaEventSerialized,
  NiaEventType,
  NiaExecuteCodeEvent,
  NiaExecuteCodeEventResponse,
  NiaExecuteCodeEventResponseSerialized, NiaExecuteCodeEventSerialized,
  NiaRemoveKeyboardEvent,
  NiaRemoveKeyboardEventResponse,
  NiaRemoveKeyboardEventResponseSerialized, NiaRemoveKeyboardEventSerialized,
  NiaRemoveModifierEvent,
  NiaRemoveModifierEventResponse,
  NiaRemoveModifierEventResponseSerialized, NiaRemoveModifierEventSerialized,
  NiaSynchronizeEvent,
  NiaSynchronizeEventResponse,
  NiaSynchronizeEventResponseSerialized, NiaSynchronizeEventSerialized,
} from '@/utils'
import SerializableObject from '../../serializableObj'

export enum NiaEventResponseType {
  NiaDefineKeyboardEventResponse,
  NiaDefineModifierEventResponse,
  NiaExecuteCodeEventResponse,
  NiaRemoveKeyboardEventResponse,
  NiaRemoveModifierEventResponse,
  NiaSynchronizeEventResponse
}

export type NiaEventResponseUnderlyingType =
  NiaDefineKeyboardEventResponse |
  NiaDefineModifierEventResponse |
  NiaExecuteCodeEventResponse |
  NiaRemoveKeyboardEventResponse |
  NiaRemoveModifierEventResponse |
  NiaSynchronizeEventResponse

export type NiaEventResponseUnderlyingTypeSerialized =
  NiaDefineKeyboardEventResponseSerialized |
  NiaDefineModifierEventResponseSerialized |
  NiaExecuteCodeEventResponseSerialized |
  NiaRemoveKeyboardEventResponseSerialized |
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
    return this.event instanceof NiaDefineKeyboardEventResponse
  }

  isDefineModifierEventResponse(): boolean {
    return this.event instanceof NiaDefineModifierEventResponse
  }

  isExecuteCodeEventResponse(): boolean {
    return this.event instanceof NiaExecuteCodeEventResponse
  }

  isRemoveKeyboardEventResponse(): boolean {
    return this.event instanceof NiaRemoveKeyboardEventResponse
  }

  isRemoveModifierEventResponse(): boolean {
    return this.event instanceof NiaRemoveModifierEventResponse
  }

  isSynchronizeEventResponse(): boolean {
    return this.event instanceof NiaSynchronizeEventResponse
  }

  takeDefineKeyboardEventResponse(): NiaDefineKeyboardEventResponse {
    return this.event as NiaDefineKeyboardEventResponse
  }

  takeDefineModifierEventResponse(): NiaDefineModifierEventResponse {
    return this.event as NiaDefineModifierEventResponse
  }

  takeExecuteCodeEventResponse(): NiaExecuteCodeEventResponse {
    return this.event as NiaExecuteCodeEventResponse
  }

  takeRemoveKeyboardEventResponse(): NiaRemoveKeyboardEventResponse {
    return this.event as NiaRemoveKeyboardEventResponse
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
        const defineKeyboardEventResponse = NiaDefineKeyboardEventResponse.deserialize(defineKeyboardEventResponseSerialized)
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
        const removeKeyboardEventResponseSerialized = serialized.eventResponse as NiaRemoveKeyboardEventResponseSerialized
        const removeKeyboardEventResponse = NiaRemoveKeyboardEventResponse.deserialize(removeKeyboardEventResponseSerialized)
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
    if (this.event instanceof NiaDefineKeyboardEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaDefineKeyboardEventResponse,
        eventResponse: (this.event as NiaDefineKeyboardEventResponse).serialize(),
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
    } else if (this.event instanceof NiaRemoveKeyboardEventResponse) {
      return {
        eventType: NiaEventResponseType.NiaRemoveKeyboardEventResponse,
        eventResponse: (this.event as NiaRemoveKeyboardEventResponse).serialize(),
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

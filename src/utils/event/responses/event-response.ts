import {
  NiaDefineDeviceEventResponse,
  NiaDefineModifierEventResponse,
  NiaExecuteCodeEventResponse,
  NiaRemoveDeviceEventResponse,
  NiaRemoveModifierEventResponse,
  NiaSynchronizeEventResponse,
  NiaDefineKeyboardEventResponseSerialized,
  NiaDefineModifierEventResponseSerialized,
  NiaSynchronizeEventResponseSerialized,
  NiaExecuteCodeEventResponseSerialized, NiaRemoveDeviceResponseSerialized, NiaRemoveModifierEventResponseSerialized,
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {
  NiaDefineActionEventResponse,
  NiaDefineActionEventResponseSerialized,
} from '@/utils/event/responses/define-action-event-response'
import {
  NiaRemoveActionEventResponse,
  NiaRemoveActionEventResponseSerialized,
} from '@/utils/event/responses/remove-action-event-response'

export enum NiaEventResponseType {
  DefineDevice,
  DefineModifier,
  ExecuteCode,
  RemoveDevice,
  RemoveModifier,
  DefineAction,
  RemoveAction,
  Synchronize
}

export type NiaEventResponseUnderlyingType =
  NiaDefineDeviceEventResponse |
  NiaDefineModifierEventResponse |
  NiaExecuteCodeEventResponse |
  NiaRemoveDeviceEventResponse |
  NiaRemoveModifierEventResponse |
  NiaDefineActionEventResponse |
  NiaRemoveActionEventResponse |
  NiaSynchronizeEventResponse

export type NiaEventResponseUnderlyingTypeSerialized =
  NiaDefineKeyboardEventResponseSerialized |
  NiaDefineModifierEventResponseSerialized |
  NiaExecuteCodeEventResponseSerialized |
  NiaRemoveDeviceResponseSerialized |
  NiaRemoveModifierEventResponseSerialized |
  NiaDefineActionEventResponseSerialized |
  NiaRemoveActionEventResponseSerialized |
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

  isDefineDeviceEventResponse(): boolean {
    return this.event instanceof NiaDefineDeviceEventResponse
  }

  isDefineModifierEventResponse(): boolean {
    return this.event instanceof NiaDefineModifierEventResponse
  }

  isExecuteCodeEventResponse(): boolean {
    return this.event instanceof NiaExecuteCodeEventResponse
  }

  isRemoveDeviceEventResponse(): boolean {
    return this.event instanceof NiaRemoveDeviceEventResponse
  }

  isRemoveModifierEventResponse(): boolean {
    return this.event instanceof NiaRemoveModifierEventResponse
  }

  isDefineActionEventResponse(): boolean {
    return this.event instanceof NiaDefineActionEventResponse
  }

  isRemoveActionEventResponse(): boolean {
    return this.event instanceof NiaRemoveActionEventResponse
  }

  isSynchronizeEventResponse(): boolean {
    return this.event instanceof NiaSynchronizeEventResponse
  }

  takeDefineDeviceEventResponse(): NiaDefineDeviceEventResponse {
    return this.event as NiaDefineDeviceEventResponse
  }

  takeDefineModifierEventResponse(): NiaDefineModifierEventResponse {
    return this.event as NiaDefineModifierEventResponse
  }

  takeExecuteCodeEventResponse(): NiaExecuteCodeEventResponse {
    return this.event as NiaExecuteCodeEventResponse
  }

  takeRemoveDeviceEventResponse(): NiaRemoveDeviceEventResponse {
    return this.event as NiaRemoveDeviceEventResponse
  }

  takeRemoveModifierEventResponse(): NiaRemoveModifierEventResponse {
    return this.event as NiaRemoveModifierEventResponse
  }

  takeDefineActionEventResponse(): NiaDefineActionEventResponse {
    return this.event as NiaDefineActionEventResponse
  }

  takeRemoveActionEventResponse(): NiaRemoveActionEventResponse {
    return this.event as NiaRemoveActionEventResponse
  }

  takeSynchronizeEventResponse(): NiaSynchronizeEventResponse {
    return this.event as NiaSynchronizeEventResponse
  }

  static deserialize(serialized: NiaEventResponseSerialized): NiaEventResponse {
    switch (serialized.eventType) {
      case NiaEventResponseType.DefineDevice:
        const defineKeyboardEventResponseSerialized = serialized.eventResponse as NiaDefineKeyboardEventResponseSerialized
        const defineKeyboardEventResponse = NiaDefineDeviceEventResponse.deserialize(defineKeyboardEventResponseSerialized)
        return new NiaEventResponse(defineKeyboardEventResponse)

      case NiaEventResponseType.DefineModifier:
        const defineModifierEventResponseSerialized = serialized.eventResponse as NiaDefineModifierEventResponseSerialized
        const defineModifierEventResponse = NiaDefineModifierEventResponse.deserialize(defineModifierEventResponseSerialized)
        return new NiaEventResponse(defineModifierEventResponse)

      case NiaEventResponseType.ExecuteCode:
        const executeCodeEventResponseSerialized = serialized.eventResponse as NiaExecuteCodeEventResponseSerialized
        const executeCodeEventResponse = NiaExecuteCodeEventResponse.deserialize(executeCodeEventResponseSerialized)
        return new NiaEventResponse(executeCodeEventResponse)

      case NiaEventResponseType.RemoveDevice:
        const removeKeyboardEventResponseSerialized = serialized.eventResponse as NiaRemoveDeviceResponseSerialized
        const removeKeyboardEventResponse = NiaRemoveDeviceEventResponse.deserialize(removeKeyboardEventResponseSerialized)
        return new NiaEventResponse(removeKeyboardEventResponse)

      case NiaEventResponseType.RemoveModifier:
        const removeModifierEventResponseSerialized = serialized.eventResponse as NiaRemoveModifierEventResponseSerialized
        const removeModifierEventResponse = NiaRemoveModifierEventResponse.deserialize(removeModifierEventResponseSerialized)
        return new NiaEventResponse(removeModifierEventResponse)

      case NiaEventResponseType.DefineAction:
        const defineActionEventResponseSerialized = serialized.eventResponse as NiaDefineActionEventResponseSerialized
        const defineActionEventResponse = NiaDefineActionEventResponse.deserialize(defineActionEventResponseSerialized)
        return new NiaEventResponse(defineActionEventResponse)

      case NiaEventResponseType.RemoveAction:
        const removeActionEventResponseSerialized = serialized.eventResponse as NiaRemoveActionEventResponseSerialized
        const removeActionEventResponse = NiaRemoveActionEventResponse.deserialize(removeActionEventResponseSerialized)
        return new NiaEventResponse(removeActionEventResponse)

      case NiaEventResponseType.Synchronize:
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
        eventType: NiaEventResponseType.DefineDevice,
        eventResponse: (this.event as NiaDefineDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaDefineModifierEventResponse) {
      return {
        eventType: NiaEventResponseType.DefineModifier,
        eventResponse: (this.event as NiaDefineModifierEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaExecuteCodeEventResponse) {
      return {
        eventType: NiaEventResponseType.ExecuteCode,
        eventResponse: (this.event as NiaExecuteCodeEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveDeviceEventResponse) {
      return {
        eventType: NiaEventResponseType.RemoveDevice,
        eventResponse: (this.event as NiaRemoveDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveModifierEventResponse) {
      return {
        eventType: NiaEventResponseType.RemoveModifier,
        eventResponse: (this.event as NiaRemoveModifierEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaDefineActionEventResponse) {
      return {
        eventType: NiaEventResponseType.DefineAction,
        eventResponse: (this.event as NiaDefineActionEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveActionEventResponse) {
      return {
        eventType: NiaEventResponseType.RemoveAction,
        eventResponse: (this.event as NiaRemoveActionEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaSynchronizeEventResponse) {
      return {
        eventType: NiaEventResponseType.Synchronize,
        eventResponse: (this.event as NiaSynchronizeEventResponse).serialize(),
      }
    } else {
      throw new Error('Unknown event to serialize.')
    }
  }

}

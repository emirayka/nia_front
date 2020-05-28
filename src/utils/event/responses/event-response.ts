import {
  NiaDefineDeviceEventResponse,
  NiaDefineModifierEventResponse,
  NiaExecuteCodeEventResponse,
  NiaRemoveDeviceEventResponse,
  NiaRemoveModifierEventResponse,
  NiaSynchronizeEventResponse,
  NiaDefineDeviceEventResponseSerialized,
  NiaDefineModifierEventResponseSerialized,
  NiaSynchronizeEventResponseSerialized,
  NiaExecuteCodeEventResponseSerialized,
  NiaRemoveDeviceResponseSerialized,
  NiaRemoveModifierEventResponseSerialized,
  NiaDefineMappingEventResponse,
  NiaRemoveMappingEventResponse,
  NiaDefineMappingEventResponseSerialized,
  NiaRemoveMappingEventResponseSerialized,
} from '@/utils'

import {
  NiaDefineActionEventResponse,
  NiaDefineActionEventResponseSerialized,
} from '@/utils'

import {
  NiaRemoveActionEventResponse,
  NiaRemoveActionEventResponseSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'
import {
  NiaChangeMappingEventResponse,
  NiaChangeMappingEventResponseSerialized,
} from '@/utils/event/responses/change-mapping-event-response'
import {
  NiaStartListeningEventResponse,
  NiaStartListeningEventResponseSerialized,
} from '@/utils/event/responses/start-listening-event-response'
import {
  NiaStopListeningEventResponse,
  NiaStopListeningEventResponseSerialized,
} from '@/utils/event/responses/stop-listening-event-response'

export enum NiaEventResponseType {
  Synchronize,
  ExecuteCode,

  DefineDevice,
  RemoveDevice,

  DefineModifier,
  RemoveModifier,

  DefineAction,
  RemoveAction,

  DefineMapping,
  ChangeMapping,
  RemoveMapping,

  StartListening,
  StopListening,
}

export type NiaEventResponseUnderlyingType =
  NiaSynchronizeEventResponse |
  NiaExecuteCodeEventResponse |
  NiaDefineDeviceEventResponse |
  NiaRemoveDeviceEventResponse |
  NiaDefineModifierEventResponse |
  NiaRemoveModifierEventResponse |
  NiaDefineActionEventResponse |
  NiaRemoveActionEventResponse |
  NiaDefineMappingEventResponse |
  NiaChangeMappingEventResponse |
  NiaRemoveMappingEventResponse |
  NiaStartListeningEventResponse |
  NiaStopListeningEventResponse

export type NiaEventResponseUnderlyingTypeSerialized =
  NiaSynchronizeEventResponseSerialized |
  NiaExecuteCodeEventResponseSerialized |
  NiaDefineDeviceEventResponseSerialized |
  NiaRemoveDeviceResponseSerialized |
  NiaDefineModifierEventResponseSerialized |
  NiaRemoveModifierEventResponseSerialized |
  NiaDefineActionEventResponseSerialized |
  NiaRemoveActionEventResponseSerialized |
  NiaDefineMappingEventResponseSerialized |
  NiaChangeMappingEventResponseSerialized |
  NiaRemoveMappingEventResponseSerialized |
  NiaStartListeningEventResponseSerialized |
  NiaStopListeningEventResponseSerialized

export interface NiaEventResponseSerialized {
  eventResponse: NiaEventResponseUnderlyingTypeSerialized,
  eventType: NiaEventResponseType
}

export class NiaEventResponse implements SerializableObject<NiaEventResponse, NiaEventResponseSerialized> {
  private readonly event: NiaEventResponseUnderlyingType

  constructor(event: NiaEventResponseUnderlyingType) {
    this.event = event
  }

  isSynchronizeEventResponse(): boolean {
    return this.event instanceof NiaSynchronizeEventResponse
  }

  isExecuteCodeEventResponse(): boolean {
    return this.event instanceof NiaExecuteCodeEventResponse
  }

  isDefineDeviceEventResponse(): boolean {
    return this.event instanceof NiaDefineDeviceEventResponse
  }

  isRemoveDeviceEventResponse(): boolean {
    return this.event instanceof NiaRemoveDeviceEventResponse
  }

  isDefineModifierEventResponse(): boolean {
    return this.event instanceof NiaDefineModifierEventResponse
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

  isDefineMappingEventResponse(): boolean {
    return this.event instanceof NiaDefineMappingEventResponse
  }

  isChangeMappingEventResponse(): boolean {
    return this.event instanceof NiaChangeMappingEventResponse
  }

  isRemoveMappingEventResponse(): boolean {
    return this.event instanceof NiaRemoveMappingEventResponse
  }

  isStartListeningEventResponse(): boolean {
    return this.event instanceof NiaStartListeningEventResponse
  }

  isStopListeningEventResponse(): boolean {
    return this.event instanceof NiaStopListeningEventResponse
  }

  // take

  takeSynchronizeEventResponse(): NiaSynchronizeEventResponse {
    return this.event as NiaSynchronizeEventResponse
  }

  takeExecuteCodeEventResponse(): NiaExecuteCodeEventResponse {
    return this.event as NiaExecuteCodeEventResponse
  }

  takeDefineDeviceEventResponse(): NiaDefineDeviceEventResponse {
    return this.event as NiaDefineDeviceEventResponse
  }

  takeRemoveDeviceEventResponse(): NiaRemoveDeviceEventResponse {
    return this.event as NiaRemoveDeviceEventResponse
  }

  takeDefineModifierEventResponse(): NiaDefineModifierEventResponse {
    return this.event as NiaDefineModifierEventResponse
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

  takeDefineMappingEventResponse(): NiaDefineMappingEventResponse {
    return this.event as NiaDefineMappingEventResponse
  }

  takeChangeMappingEventResponse(): NiaChangeMappingEventResponse {
    return this.event as NiaChangeMappingEventResponse
  }

  takeRemoveMappingEventResponse(): NiaRemoveMappingEventResponse {
    return this.event as NiaRemoveMappingEventResponse
  }

  takeStartListeningEventResponse(): NiaStartListeningEventResponse {
    return this.event as NiaStartListeningEventResponse
  }

  takeStopListeningEventResponse(): NiaStopListeningEventResponse {
    return this.event as NiaStopListeningEventResponse
  }

  static deserialize(serialized: NiaEventResponseSerialized): NiaEventResponse {
    switch (serialized.eventType) {
      case NiaEventResponseType.Synchronize:
        const synchronizeEventResponseSerialized = serialized.eventResponse as NiaSynchronizeEventResponseSerialized
        const synchronizeEventResponse = NiaSynchronizeEventResponse.deserialize(synchronizeEventResponseSerialized)
        return new NiaEventResponse(synchronizeEventResponse)

      case NiaEventResponseType.ExecuteCode:
        const executeCodeEventResponseSerialized = serialized.eventResponse as NiaExecuteCodeEventResponseSerialized
        const executeCodeEventResponse = NiaExecuteCodeEventResponse.deserialize(executeCodeEventResponseSerialized)
        return new NiaEventResponse(executeCodeEventResponse)

      case NiaEventResponseType.DefineDevice:
        const defineDeviceEventResponseSerialized = serialized.eventResponse as NiaDefineDeviceEventResponseSerialized
        const defineDeviceEventResponse = NiaDefineDeviceEventResponse.deserialize(defineDeviceEventResponseSerialized)
        return new NiaEventResponse(defineDeviceEventResponse)

      case NiaEventResponseType.RemoveDevice:
        const removeDeviceEventResponseSerialized = serialized.eventResponse as NiaRemoveDeviceResponseSerialized
        const removeDeviceEventResponse = NiaRemoveDeviceEventResponse.deserialize(removeDeviceEventResponseSerialized)
        return new NiaEventResponse(removeDeviceEventResponse)

      case NiaEventResponseType.DefineModifier:
        const defineModifierEventResponseSerialized = serialized.eventResponse as NiaDefineModifierEventResponseSerialized
        const defineModifierEventResponse = NiaDefineModifierEventResponse.deserialize(defineModifierEventResponseSerialized)
        return new NiaEventResponse(defineModifierEventResponse)

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

      case NiaEventResponseType.DefineMapping:
        const defineMappingEventResponseSerialized = serialized.eventResponse as NiaDefineMappingEventResponseSerialized
        const defineMappingEventResponse = NiaDefineMappingEventResponse.deserialize(defineMappingEventResponseSerialized)
        return new NiaEventResponse(defineMappingEventResponse)

      case NiaEventResponseType.ChangeMapping:
        const changeMappingEventResponseSerialized = serialized.eventResponse as NiaChangeMappingEventResponseSerialized
        const changeMappingEventResponse = NiaChangeMappingEventResponse.deserialize(changeMappingEventResponseSerialized)
        return new NiaEventResponse(changeMappingEventResponse)

      case NiaEventResponseType.RemoveMapping:
        const removeMappingEventResponseSerialized = serialized.eventResponse as NiaRemoveMappingEventResponseSerialized
        const removeMappingEventResponse = NiaRemoveMappingEventResponse.deserialize(removeMappingEventResponseSerialized)
        return new NiaEventResponse(removeMappingEventResponse)

      case NiaEventResponseType.StartListening:
        const startListeningEventResponseSerialized = serialized.eventResponse as NiaStartListeningEventResponseSerialized
        const startListeningEventResponse = NiaStartListeningEventResponse.deserialize(startListeningEventResponseSerialized)
        return new NiaEventResponse(startListeningEventResponse)

      case NiaEventResponseType.StopListening:
        const stopListeningEventResponseSerialized = serialized.eventResponse as NiaStopListeningEventResponseSerialized
        const stopListeningEventResponse = NiaStopListeningEventResponse.deserialize(stopListeningEventResponseSerialized)
        return new NiaEventResponse(stopListeningEventResponse)

      default:
        throw new Error('Unknown event type.')
    }
  }

  serialize(): NiaEventResponseSerialized {
    // todo: probably remove type as type casting, because they may be unnecessary
    if (this.event instanceof NiaSynchronizeEventResponse) {
      return {
        eventType: NiaEventResponseType.Synchronize,
        eventResponse: (this.event as NiaSynchronizeEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaExecuteCodeEventResponse) {
      return {
        eventType: NiaEventResponseType.ExecuteCode,
        eventResponse: (this.event as NiaExecuteCodeEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaDefineDeviceEventResponse) {
      return {
        eventType: NiaEventResponseType.DefineDevice,
        eventResponse: (this.event as NiaDefineDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveDeviceEventResponse) {
      return {
        eventType: NiaEventResponseType.RemoveDevice,
        eventResponse: (this.event as NiaRemoveDeviceEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaDefineModifierEventResponse) {
      return {
        eventType: NiaEventResponseType.DefineModifier,
        eventResponse: (this.event as NiaDefineModifierEventResponse).serialize(),
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
    } else if (this.event instanceof NiaDefineMappingEventResponse) {
      return {
        eventType: NiaEventResponseType.DefineMapping,
        eventResponse: (this.event as NiaDefineMappingEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaChangeMappingEventResponse) {
      return {
        eventType: NiaEventResponseType.ChangeMapping,
        eventResponse: (this.event as NiaChangeMappingEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaRemoveMappingEventResponse) {
      return {
        eventType: NiaEventResponseType.RemoveMapping,
        eventResponse: (this.event as NiaRemoveMappingEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaStartListeningEventResponse) {
      return {
        eventType: NiaEventResponseType.StartListening,
        eventResponse: (this.event as NiaStartListeningEventResponse).serialize(),
      }
    } else if (this.event instanceof NiaStopListeningEventResponse) {
      return {
        eventType: NiaEventResponseType.StopListening,
        eventResponse: (this.event as NiaStopListeningEventResponse).serialize(),
      }
    } else {
      throw new Error('Unknown event to serialize.')
    }
  }

}

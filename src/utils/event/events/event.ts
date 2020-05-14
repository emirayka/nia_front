import {
  NiaDefineDeviceEvent, NiaDefineDeviceEventObject, NiaDefineDeviceEventSerialized,
  NiaDefineModifierEvent, NiaDefineModifierEventObject, NiaDefineModifierEventSerialized,
  NiaExecuteCodeEvent, NiaExecuteCodeEventObject, NiaExecuteCodeEventSerialized,
  NiaRemoveDeviceEvent, NiaRemoveDeviceEventObject, NiaRemoveDeviceEventSerialized,
  NiaRemoveModifierEvent, NiaRemoveModifierEventObject, NiaRemoveModifierEventSerialized,
  NiaSynchronizeEvent, NiaSynchronizeEventObject, NiaSynchronizeEventSerialized,
} from './index'

import SerializableObject from '@/utils/serializable-object'

export enum NiaEventType {
  DefineDevice,
  DefineModifier,
  ExecuteCode,
  RemoveDevice,
  RemoveModifier,
  Synchronize
}

export type NiaEventUnderlyingTypeSerialized = NiaDefineDeviceEventSerialized |
  NiaDefineModifierEventSerialized |
  NiaExecuteCodeEventSerialized |
  NiaRemoveDeviceEventSerialized |
  NiaRemoveModifierEventSerialized |
  NiaSynchronizeEventSerialized

export type NiaEventUnderlyingType = NiaDefineDeviceEvent |
  NiaDefineModifierEvent |
  NiaExecuteCodeEvent |
  NiaRemoveDeviceEvent |
  NiaRemoveModifierEvent |
  NiaSynchronizeEvent

export interface NiaEventSerialized {
  eventType: NiaEventType,
  event: NiaEventUnderlyingTypeSerialized
}

export class NiaEvent implements SerializableObject<NiaEvent, NiaEventSerialized> {
  private readonly eventType: NiaEventType
  private readonly event: NiaEventUnderlyingType

  constructor(event: NiaEventUnderlyingType) {
    this.eventType = event.getEventType()
    this.event = event
  }

  isDefineDeviceEvent(): boolean {
    return this.eventType === NiaEventType.DefineDevice
  }

  isDefineModifierEvent(): boolean {
    return this.eventType === NiaEventType.DefineModifier
  }

  isExecuteCodeEvent(): boolean {
    return this.eventType === NiaEventType.ExecuteCode
  }

  isRemoveDeviceEvent(): boolean {
    return this.eventType === NiaEventType.RemoveDevice
  }

  isRemoveModifierEvent(): boolean {
    return this.eventType === NiaEventType.RemoveModifier
  }

  isSynchronizeEvent(): boolean {
    return this.eventType === NiaEventType.Synchronize
  }

  takeDefineDeviceEvent(): NiaDefineDeviceEvent {
    return this.event as NiaDefineDeviceEvent
  }

  takeDefineModifierEvent(): NiaDefineModifierEvent {
    return this.event as NiaDefineModifierEvent
  }

  takeExecuteCodeEvent(): NiaExecuteCodeEvent {
    return this.event as NiaExecuteCodeEvent
  }

  takeRemoveDeviceEvent(): NiaRemoveDeviceEvent {
    return this.event as NiaRemoveDeviceEvent
  }

  takeRemoveModifierEvent(): NiaRemoveModifierEvent {
    return this.event as NiaRemoveModifierEvent
  }

  takeSynchronizeEvent(): NiaSynchronizeEvent {
    return this.event as NiaSynchronizeEvent
  }

  static deserialize(serialized: NiaEventSerialized): NiaEvent {
    switch (serialized.eventType) {
      case NiaEventType.DefineDevice:
        const defineKeyboardEventSerialized = serialized.event as NiaDefineDeviceEventObject
        const defineKeyboardEvent = NiaDefineDeviceEvent.deserialize(defineKeyboardEventSerialized)
        return new NiaEvent(defineKeyboardEvent)
      
      case NiaEventType.DefineModifier:
        const defineModifierEventSerialized = serialized.event as NiaDefineModifierEventObject
        const defineModifierEvent = NiaDefineModifierEvent.deserialize(defineModifierEventSerialized)
        return new NiaEvent(defineModifierEvent)
      
      case NiaEventType.ExecuteCode:
        const executeCodeEventSerialized = serialized.event as NiaExecuteCodeEventObject
        const executeCodeEvent = NiaExecuteCodeEvent.deserialize(executeCodeEventSerialized)
        return new NiaEvent(executeCodeEvent)
      
      case NiaEventType.RemoveDevice:
        const removeKeyboardEventSerialized = serialized.event as NiaRemoveDeviceEventObject
        const removeKeyboardEvent = NiaRemoveDeviceEvent.deserialize(removeKeyboardEventSerialized)
        return new NiaEvent(removeKeyboardEvent)
      
      case NiaEventType.RemoveModifier:
        const removeModifierEventSerialized = serialized.event as NiaRemoveModifierEventObject
        const removeModifierEvent = NiaRemoveModifierEvent.deserialize(removeModifierEventSerialized)
        return new NiaEvent(removeModifierEvent)
      
      case NiaEventType.Synchronize:
        const synchronizeEventSerialized = serialized.event as NiaSynchronizeEventObject
        const synchronizeEvent = NiaSynchronizeEvent.deserialize(synchronizeEventSerialized)
        return new NiaEvent(synchronizeEvent)
      
      default:
        throw new Error('Unknown event type.')
    }
  }

  serialize(): NiaEventSerialized {
    switch (this.eventType) {
      case NiaEventType.DefineDevice:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineDeviceEvent).serialize()
        }
      case NiaEventType.DefineModifier:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineModifierEvent).serialize()
        }
      case NiaEventType.ExecuteCode:
        return {
          eventType: this.eventType,
          event: (this.event as NiaExecuteCodeEvent).serialize()
        }
      case NiaEventType.RemoveDevice:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveDeviceEvent).serialize()
        }
      case NiaEventType.RemoveModifier:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveModifierEvent).serialize()
        }
      case NiaEventType.Synchronize:
        return {
          eventType: this.eventType,
          event: (this.event as NiaSynchronizeEvent).serialize()
        }

      default:
        throw new Error('Unknown event type')
    }
  }
}
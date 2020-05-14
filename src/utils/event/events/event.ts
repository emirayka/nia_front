import {
  NiaDefineKeyboardEvent, NiaDefineKeyboardEventSerialized,
  NiaDefineModifierEvent, NiaDefineModifierEventSerialized,
  NiaExecuteCodeEvent, NiaExecuteCodeEventSerialized,
  NiaRemoveKeyboardEvent, NiaRemoveKeyboardEventSerialized,
  NiaRemoveModifierEvent, NiaRemoveModifierEventSerialized,
  NiaSynchronizeEvent, NiaSynchronizeEventSerialized,
} from './index'
import SerializableObject from '../../serializableObj'

export enum NiaEventType {
  NiaDefineKeyboardEvent,
  NiaDefineModifierEvent,
  NiaExecuteCodeEvent,
  NiaRemoveKeyboardEvent,
  NiaRemoveModifierEvent,
  NiaSynchronizeEvent
}

export type NiaEventUnderlyingTypeSerialized = NiaDefineKeyboardEventSerialized |
  NiaDefineModifierEventSerialized |
  NiaExecuteCodeEventSerialized |
  NiaRemoveKeyboardEventSerialized |
  NiaRemoveModifierEventSerialized |
  NiaSynchronizeEventSerialized

export type NiaEventUnderlyingType = NiaDefineKeyboardEvent |
  NiaDefineModifierEvent |
  NiaExecuteCodeEvent |
  NiaRemoveKeyboardEvent |
  NiaRemoveModifierEvent |
  NiaSynchronizeEvent

export interface NiaEventSerialized {
  eventType: NiaEventType,
  event: NiaEventUnderlyingTypeSerialized
}

export class NiaEvent implements SerializableObject<NiaEvent, NiaEventSerialized> {
  private readonly event: NiaEventUnderlyingType

  constructor(event: NiaEventUnderlyingType) {
    this.event = event
  }

  isDefineKeyboardEvent(): boolean {
    return this.event instanceof NiaDefineKeyboardEvent
  }

  isDefineModifierEvent(): boolean {
    return this.event instanceof NiaDefineModifierEvent
  }

  isExecuteCodeEvent(): boolean {
    return this.event instanceof NiaExecuteCodeEvent
  }

  isRemoveKeyboardEvent(): boolean {
    return this.event instanceof NiaRemoveKeyboardEvent
  }

  isRemoveModifierEvent(): boolean {
    return this.event instanceof NiaRemoveModifierEvent
  }

  isSynchronizeEvent(): boolean {
    return this.event instanceof NiaSynchronizeEvent
  }

  takeDefineKeyboardEvent(): NiaDefineKeyboardEvent {
    return this.event as NiaDefineKeyboardEvent
  }

  takeDefineModifierEvent(): NiaDefineModifierEvent {
    return this.event as NiaDefineModifierEvent
  }

  takeExecuteCodeEvent(): NiaExecuteCodeEvent {
    return this.event as NiaExecuteCodeEvent
  }

  takeRemoveKeyboardEvent(): NiaRemoveKeyboardEvent {
    return this.event as NiaRemoveKeyboardEvent
  }

  takeRemoveModifierEvent(): NiaRemoveModifierEvent {
    return this.event as NiaRemoveModifierEvent
  }

  takeSynchronizeEvent(): NiaSynchronizeEvent {
    return this.event as NiaSynchronizeEvent
  }

  static deserialize(serialized: NiaEventSerialized): NiaEvent {
    switch (serialized.eventType) {
      case NiaEventType.NiaDefineKeyboardEvent:
        const defineKeyboardEventSerialized = serialized.event as NiaDefineKeyboardEventSerialized
        const defineKeyboardEvent = NiaDefineKeyboardEvent.deserialize(defineKeyboardEventSerialized)
        return new NiaEvent(defineKeyboardEvent)
      
      case NiaEventType.NiaDefineModifierEvent:
        const defineModifierEventSerialized = serialized.event as NiaDefineModifierEventSerialized
        const defineModifierEvent = NiaDefineModifierEvent.deserialize(defineModifierEventSerialized)
        return new NiaEvent(defineModifierEvent)
      
      case NiaEventType.NiaExecuteCodeEvent:
        const executeCodeEventSerialized = serialized.event as NiaExecuteCodeEventSerialized
        const executeCodeEvent = NiaExecuteCodeEvent.deserialize(executeCodeEventSerialized)
        return new NiaEvent(executeCodeEvent)
      
      case NiaEventType.NiaRemoveKeyboardEvent:
        const removeKeyboardEventSerialized = serialized.event as NiaRemoveKeyboardEventSerialized
        const removeKeyboardEvent = NiaRemoveKeyboardEvent.deserialize(removeKeyboardEventSerialized)
        return new NiaEvent(removeKeyboardEvent)
      
      case NiaEventType.NiaRemoveModifierEvent:
        const removeModifierEventSerialized = serialized.event as NiaRemoveModifierEventSerialized
        const removeModifierEvent = NiaRemoveModifierEvent.deserialize(removeModifierEventSerialized)
        return new NiaEvent(removeModifierEvent)
      
      case NiaEventType.NiaSynchronizeEvent:
        const synchronizeEventSerialized = serialized.event as NiaSynchronizeEventSerialized
        const synchronizeEvent = NiaSynchronizeEvent.deserialize(synchronizeEventSerialized)
        return new NiaEvent(synchronizeEvent)
      
      default:
        throw new Error('Unknown event type.')
    }
  }

  serialize(): NiaEventSerialized {
    // todo: probably remove type as type casting, because they may be unnecessary
    if (this.event instanceof NiaDefineKeyboardEvent) {
      return {
        eventType: NiaEventType.NiaDefineKeyboardEvent,
        event: (this.event as NiaDefineKeyboardEvent).serialize()
      }
    } else if (this.event instanceof NiaDefineModifierEvent) {
      return {
        eventType: NiaEventType.NiaDefineModifierEvent,
        event: (this.event as NiaDefineModifierEvent).serialize()
      }
    } else if (this.event instanceof NiaExecuteCodeEvent) {
      return {
        eventType: NiaEventType.NiaExecuteCodeEvent,
        event: (this.event as NiaExecuteCodeEvent).serialize()
      }
    } else if (this.event instanceof NiaRemoveKeyboardEvent) {
      return {
        eventType: NiaEventType.NiaRemoveKeyboardEvent,
        event: (this.event as NiaRemoveKeyboardEvent).serialize()
      }
    } else if (this.event instanceof NiaRemoveModifierEvent) {
      return {
        eventType: NiaEventType.NiaRemoveModifierEvent,
        event: (this.event as NiaRemoveModifierEvent).serialize()
      }
    } else if (this.event instanceof NiaSynchronizeEvent) {
      return {
        eventType: NiaEventType.NiaSynchronizeEvent,
        event: (this.event as NiaSynchronizeEvent).serialize()
      }
    } else {
      throw new Error('Unknown event to serialize.')
    }
  }
}
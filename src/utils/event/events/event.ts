import {
  NiaDefineDeviceEvent,
  NiaDefineDeviceEventObject,
  NiaDefineDeviceEventSerialized, NiaDefineMappingEvent,
  NiaDefineMappingEventSerialized,
  NiaDefineModifierEvent,
  NiaDefineModifierEventObject,
  NiaDefineModifierEventSerialized,
  NiaExecuteCodeEvent,
  NiaExecuteCodeEventObject,
  NiaExecuteCodeEventSerialized,
  NiaRemoveDeviceEvent,
  NiaRemoveDeviceEventObject,
  NiaRemoveDeviceEventSerialized,
  NiaRemoveMappingEvent,
  NiaRemoveMappingEventSerialized,
  NiaRemoveModifierEvent,
  NiaRemoveModifierEventObject,
  NiaRemoveModifierEventSerialized,
  NiaSynchronizeEvent,
  NiaSynchronizeEventObject,
  NiaSynchronizeEventSerialized,
} from './index'

import SerializableObject from '@/utils/serializable-object'
import {
  NiaDefineActionEvent,
  NiaDefineActionEventObject,
  NiaDefineActionEventSerialized,
} from '@/utils'
import {NiaRemoveActionEvent, NiaRemoveActionEventSerialized} from '@/utils'
import {NiaChangeMappingEvent, NiaChangeMappingEventSerialized} from '@/utils/event/events/change-mapping-event'
import {NiaStartListeningEvent, NiaStartListeningEventSerialized} from '@/utils/event/events/start-listening-event'
import {NiaStopListeningEvent, NiaStopListeningEventSerialized} from '@/utils/event/events/stop-listening-event'

export enum NiaEventType {
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

export type NiaEventUnderlyingTypeSerialized = NiaSynchronizeEventSerialized |
  NiaExecuteCodeEventSerialized |
  NiaDefineDeviceEventSerialized |
  NiaRemoveDeviceEventSerialized |
  NiaDefineModifierEventSerialized |
  NiaRemoveModifierEventSerialized |
  NiaDefineActionEventSerialized |
  NiaRemoveActionEventSerialized |
  NiaDefineMappingEventSerialized |
  NiaChangeMappingEventSerialized |
  NiaRemoveMappingEventSerialized |
  NiaStartListeningEventSerialized |
  NiaStopListeningEventSerialized

export type NiaEventUnderlyingType =
  NiaSynchronizeEvent |
  NiaExecuteCodeEvent |
  NiaDefineDeviceEvent |
  NiaRemoveDeviceEvent |
  NiaDefineModifierEvent |
  NiaRemoveModifierEvent |
  NiaDefineActionEvent |
  NiaRemoveActionEvent |
  NiaDefineMappingEvent |
  NiaChangeMappingEvent |
  NiaRemoveMappingEvent |
  NiaStartListeningEvent |
  NiaStopListeningEvent

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

  isSynchronizeEvent(): boolean {
    return this.eventType === NiaEventType.Synchronize
  }

  isExecuteCodeEvent(): boolean {
    return this.eventType === NiaEventType.ExecuteCode
  }

  isDefineDeviceEvent(): boolean {
    return this.eventType === NiaEventType.DefineDevice
  }

  isRemoveDeviceEvent(): boolean {
    return this.eventType === NiaEventType.RemoveDevice
  }

  isDefineModifierEvent(): boolean {
    return this.eventType === NiaEventType.DefineModifier
  }

  isRemoveModifierEvent(): boolean {
    return this.eventType === NiaEventType.RemoveModifier
  }

  isDefineActionEvent(): boolean {
    return this.eventType === NiaEventType.DefineAction
  }

  isRemoveActionEvent(): boolean {
    return this.eventType === NiaEventType.RemoveAction
  }

  isDefineMappingEvent(): boolean {
    return this.eventType === NiaEventType.DefineMapping
  }

  isChangeMappingEvent(): boolean {
    return this.eventType === NiaEventType.ChangeMapping
  }

  isRemoveMappingEvent(): boolean {
    return this.eventType === NiaEventType.RemoveMapping
  }

  isStartListeningEvent(): boolean {
    return this.eventType === NiaEventType.StartListening
  }

  isStopListeningEvent(): boolean {
    return this.eventType === NiaEventType.StopListening
  }

  takeSynchronizeEvent(): NiaSynchronizeEvent {
    return this.event as NiaSynchronizeEvent
  }

  takeExecuteCodeEvent(): NiaExecuteCodeEvent {
    return this.event as NiaExecuteCodeEvent
  }

  takeDefineDeviceEvent(): NiaDefineDeviceEvent {
    return this.event as NiaDefineDeviceEvent
  }

  takeRemoveDeviceEvent(): NiaRemoveDeviceEvent {
    return this.event as NiaRemoveDeviceEvent
  }

  takeDefineModifierEvent(): NiaDefineModifierEvent {
    return this.event as NiaDefineModifierEvent
  }

  takeRemoveModifierEvent(): NiaRemoveModifierEvent {
    return this.event as NiaRemoveModifierEvent
  }

  takeDefineActionEvent(): NiaDefineActionEvent {
    return this.event as NiaDefineActionEvent
  }

  takeRemoveActionEvent(): NiaRemoveActionEvent {
    return this.event as NiaRemoveActionEvent
  }

  takeDefineMappingEvent(): NiaDefineMappingEvent {
    return this.event as NiaDefineMappingEvent
  }

  takeChangeMappingEvent(): NiaChangeMappingEvent {
    return this.event as NiaChangeMappingEvent
  }

  takeRemoveMappingEvent(): NiaRemoveMappingEvent {
    return this.event as NiaRemoveMappingEvent
  }

  takeStartListeningEvent(): NiaStartListeningEvent {
    return this.event as NiaStartListeningEvent
  }

  takeStopListeningEvent(): NiaStopListeningEvent {
    return this.event as NiaStopListeningEvent
  }

  static deserialize(serialized: NiaEventSerialized): NiaEvent {
    switch (serialized.eventType) {
      case NiaEventType.Synchronize:
        const synchronizeEventSerialized = serialized.event as NiaSynchronizeEventObject
        const synchronizeEvent = NiaSynchronizeEvent.deserialize(synchronizeEventSerialized)
        return new NiaEvent(synchronizeEvent)

      case NiaEventType.ExecuteCode:
        const executeCodeEventSerialized = serialized.event as NiaExecuteCodeEventSerialized
        const executeCodeEvent = NiaExecuteCodeEvent.deserialize(executeCodeEventSerialized)
        return new NiaEvent(executeCodeEvent)

      case NiaEventType.DefineDevice:
        const defineKeyboardEventSerialized = serialized.event as NiaDefineDeviceEventSerialized
        const defineKeyboardEvent = NiaDefineDeviceEvent.deserialize(defineKeyboardEventSerialized)
        return new NiaEvent(defineKeyboardEvent)

      case NiaEventType.RemoveDevice:
        const removeKeyboardEventSerialized = serialized.event as NiaRemoveDeviceEventSerialized
        const removeKeyboardEvent = NiaRemoveDeviceEvent.deserialize(removeKeyboardEventSerialized)
        return new NiaEvent(removeKeyboardEvent)

      case NiaEventType.DefineModifier:
        const defineModifierEventSerialized = serialized.event as NiaDefineModifierEventSerialized
        const defineModifierEvent = NiaDefineModifierEvent.deserialize(defineModifierEventSerialized)
        return new NiaEvent(defineModifierEvent)

      case NiaEventType.RemoveModifier:
        const removeModifierEventSerialized = serialized.event as NiaRemoveModifierEventSerialized
        const removeModifierEvent = NiaRemoveModifierEvent.deserialize(removeModifierEventSerialized)
        return new NiaEvent(removeModifierEvent)

      case NiaEventType.DefineAction:
        const defineActionEventSerialized = serialized.event as NiaDefineActionEventSerialized
        const defineActionEvent = NiaDefineActionEvent.deserialize(defineActionEventSerialized)
        return new NiaEvent(defineActionEvent)

      case NiaEventType.RemoveAction:
        const removeActionEventSerialized = serialized.event as NiaRemoveActionEventSerialized
        const removeActionEvent = NiaRemoveActionEvent.deserialize(removeActionEventSerialized)
        return new NiaEvent(removeActionEvent)

      case NiaEventType.DefineMapping:
        const defineMappingEventSerialized = serialized.event as NiaDefineMappingEventSerialized
        const defineMappingEvent = NiaDefineMappingEvent.deserialize(defineMappingEventSerialized)
        return new NiaEvent(defineMappingEvent)

      case NiaEventType.ChangeMapping:
        const changeMappingEventSerialized = serialized.event as NiaChangeMappingEventSerialized
        const changeMappingEvent = NiaChangeMappingEvent.deserialize(changeMappingEventSerialized)
        return new NiaEvent(changeMappingEvent)

      case NiaEventType.RemoveMapping:
        const removeMappingEventSerialized = serialized.event as NiaRemoveMappingEventSerialized
        const removeMappingEvent = NiaRemoveMappingEvent.deserialize(removeMappingEventSerialized)
        return new NiaEvent(removeMappingEvent)

      case NiaEventType.StartListening:
        const startListeningEventSerialized = serialized.event as NiaStartListeningEventSerialized
        const startListeningEvent = NiaStartListeningEvent.deserialize(startListeningEventSerialized)
        return new NiaEvent(startListeningEvent)

      case NiaEventType.StopListening:
        const stopListeningEventSerialized = serialized.event as NiaStopListeningEventSerialized
        const stopListeningEvent = NiaStopListeningEvent.deserialize(stopListeningEventSerialized)
        return new NiaEvent(stopListeningEvent)

      default:
        throw new Error('Unknown event type.')
    }
  }

  serialize(): NiaEventSerialized {
    switch (this.eventType) {
      case NiaEventType.Synchronize:
        return {
          eventType: this.eventType,
          event: (this.event as NiaSynchronizeEvent).serialize(),
        }

      case NiaEventType.ExecuteCode:
        return {
          eventType: this.eventType,
          event: (this.event as NiaExecuteCodeEvent).serialize(),
        }

      case NiaEventType.DefineDevice:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineDeviceEvent).serialize(),
        }

      case NiaEventType.RemoveDevice:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveDeviceEvent).serialize(),
        }

      case NiaEventType.DefineModifier:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineModifierEvent).serialize(),
        }

      case NiaEventType.RemoveModifier:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveModifierEvent).serialize(),
        }

      case NiaEventType.DefineAction:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineActionEvent).serialize(),
        }

      case NiaEventType.RemoveAction:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveActionEvent).serialize(),
        }

      case NiaEventType.DefineMapping:
        return {
          eventType: this.eventType,
          event: (this.event as NiaDefineMappingEvent).serialize(),
        }

      case NiaEventType.ChangeMapping:
        return {
          eventType: this.eventType,
          event: (this.event as NiaChangeMappingEvent).serialize(),
        }

      case NiaEventType.RemoveMapping:
        return {
          eventType: this.eventType,
          event: (this.event as NiaRemoveMappingEvent).serialize(),
        }

      case NiaEventType.StartListening:
        return {
          eventType: this.eventType,
          event: (this.event as NiaStopListeningEvent).serialize(),
        }

      case NiaEventType.StopListening:
        return {
          eventType: this.eventType,
          event: (this.event as NiaStopListeningEvent).serialize(),
        }

      default:
        throw new Error('Unknown event type')
    }
  }
}
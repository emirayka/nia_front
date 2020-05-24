import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaStartListeningEventObject {
}

export type NiaStartListeningEventSerialized = NiaStartListeningEventObject

export class NiaStartListeningEvent implements SerializableObject<NiaStartListeningEvent, NiaStartListeningEventSerialized> {
  constructor() {
  }

  getEventType(): NiaEventType {
    return NiaEventType.StartListening
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaStartListeningEventSerialized {
    return {
    }
  }

  static deserialize(obj: NiaStartListeningEventSerialized): NiaStartListeningEvent {
    return new NiaStartListeningEvent()
  }
}

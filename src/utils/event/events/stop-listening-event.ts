import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaStopListeningEventObject {
}

export type NiaStopListeningEventSerialized = NiaStopListeningEventObject

export class NiaStopListeningEvent implements SerializableObject<NiaStopListeningEvent, NiaStopListeningEventSerialized> {
  constructor() {
  }

  getEventType(): NiaEventType {
    return NiaEventType.StopListening
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaStopListeningEventSerialized {
    return {
    }
  }

  static deserialize(obj: NiaStopListeningEventSerialized): NiaStopListeningEvent {
    return new NiaStopListeningEvent()
  }
}

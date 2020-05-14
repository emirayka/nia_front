import {
  NiaEvent
} from '@/utils/event'
import SerializableObject from '../../serializableObj'

export interface NiaSynchronizeEventSerialized {
}

export class NiaSynchronizeEvent implements SerializableObject<NiaSynchronizeEvent, NiaSynchronizeEventSerialized> {
  constructor() {}

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  static deserialize(_: NiaSynchronizeEventSerialized): NiaSynchronizeEvent {
    return new NiaSynchronizeEvent()
  }

  serialize(): NiaSynchronizeEventSerialized {
    return {}
  }
}
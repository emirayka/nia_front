import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaSynchronizeEventObject {}
export type NiaSynchronizeEventSerialized = NiaSynchronizeEventObject


export class NiaSynchronizeEvent implements SerializableObject<NiaSynchronizeEvent, NiaSynchronizeEventObject> {
  constructor(args: NiaSynchronizeEventObject) {}

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  getEventType(): NiaEventType {
    return NiaEventType.Synchronize
  }

  static deserialize(obj: NiaSynchronizeEventSerialized): NiaSynchronizeEvent {
    const args: NiaSynchronizeEventObject = obj

    return new NiaSynchronizeEvent(obj)
  }

  serialize(): NiaSynchronizeEventSerialized {
    return {}
  }
}
import {NiaEvent, NiaEventType} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineDeviceEventObject {
  keyboardId: number
}

export type NiaDefineDeviceEventSerialized = NiaDefineDeviceEventObject


export class NiaDefineDeviceEvent implements SerializableObject<NiaDefineDeviceEvent, NiaDefineDeviceEventSerialized> {
  private readonly keyboardId: number

  constructor(args: NiaDefineDeviceEventObject) {
    this.keyboardId = args.keyboardId
  }

  getDeviceId(): number {
    return this.keyboardId
  }

  getEventType(): NiaEventType {
    return NiaEventType.DefineDevice
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineDeviceEventObject {
    return {
      keyboardId: this.keyboardId
    }
  }

  static deserialize(obj: NiaDefineDeviceEventObject): NiaDefineDeviceEvent {
    const args: NiaDefineDeviceEventObject = obj

    return new NiaDefineDeviceEvent(args)
  }
}
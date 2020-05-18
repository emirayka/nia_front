import {NiaEvent, NiaEventType} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineDeviceEventObject {
  deviceId: number
}

export type NiaDefineDeviceEventSerialized = NiaDefineDeviceEventObject


export class NiaDefineDeviceEvent implements SerializableObject<NiaDefineDeviceEvent, NiaDefineDeviceEventSerialized> {
  private readonly deviceId: number

  constructor(args: NiaDefineDeviceEventObject) {
    this.deviceId = args.deviceId
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getEventType(): NiaEventType {
    return NiaEventType.DefineDevice
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineDeviceEventSerialized {
    return {
      deviceId: this.deviceId
    }
  }

  static deserialize(obj: NiaDefineDeviceEventObject): NiaDefineDeviceEvent {
    const args: NiaDefineDeviceEventObject = obj

    return new NiaDefineDeviceEvent(args)
  }
}
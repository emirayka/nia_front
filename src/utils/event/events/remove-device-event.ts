import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaRemoveDeviceEventObject {
  devicePath: string
}

export type NiaRemoveDeviceEventSerialized = NiaRemoveDeviceEventObject

export class NiaRemoveDeviceEvent implements SerializableObject<NiaRemoveDeviceEvent, NiaRemoveDeviceEventSerialized> {
  private readonly devicePath: string

  constructor(args: NiaRemoveDeviceEventObject) {
    this.devicePath = args.devicePath
  }

  getDevicePath(): string {
    return this.devicePath
  }

  getEventType(): NiaEventType {
    return NiaEventType.RemoveDevice
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  static deserialize(object: NiaRemoveDeviceEventSerialized): NiaRemoveDeviceEvent {
    const args: NiaRemoveDeviceEventObject = object

    return new NiaRemoveDeviceEvent(args);
  }

  serialize(): NiaRemoveDeviceEventSerialized {
    return {
      devicePath: this.devicePath
    }
  }
}

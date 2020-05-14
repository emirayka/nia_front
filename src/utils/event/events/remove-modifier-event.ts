import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaRemoveModifierEventObject {
  deviceId: number
  keyCode: number
}

export type NiaRemoveModifierEventSerialized = NiaRemoveModifierEventObject


export class NiaRemoveModifierEvent implements SerializableObject<NiaRemoveModifierEvent, NiaRemoveModifierEventSerialized> {
  private readonly deviceId: number
  private readonly keyCode: number

  constructor(args: NiaRemoveModifierEventObject) {
    this.deviceId = args.deviceId
    this.keyCode = args.keyCode
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getEventType(): NiaEventType {
    return NiaEventType.RemoveModifier
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  static deserialize(serialized: NiaRemoveModifierEventSerialized): NiaRemoveModifierEvent {
    const args: NiaRemoveModifierEventObject = serialized

    return new NiaRemoveModifierEvent(args);
  }

  serialize(): NiaRemoveModifierEventSerialized {
    return {
      deviceId: this.deviceId,
      keyCode: this.keyCode,
    }
  }
}
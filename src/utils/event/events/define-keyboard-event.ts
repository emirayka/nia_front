import {
  NiaEvent
} from '@/utils/event'
import SerializableObject from '../../serializableObj'

export interface NiaDefineKeyboardEventSerialized {
  keyboardPath: string
  keyboardName: string
}

export class NiaDefineKeyboardEvent implements SerializableObject<NiaDefineKeyboardEvent, NiaDefineKeyboardEventSerialized> {
  private readonly keyboardPath: string
  private readonly keyboardName: string

  constructor(keyboardPath: string, keyboardName: string) {
    this.keyboardPath = keyboardPath
    this.keyboardName = keyboardName
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyboardName(): string {
    return this.keyboardName
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineKeyboardEventSerialized {
    return {
      keyboardPath: this.keyboardPath,
      keyboardName: this.keyboardName,
    }
  }

  static deserialize(obj: NiaDefineKeyboardEventSerialized): NiaDefineKeyboardEvent {
    return new NiaDefineKeyboardEvent(
      obj.keyboardPath,
      obj.keyboardName,
    )
  }
}
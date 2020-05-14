import {
  NiaEvent
} from '@/utils/event'
import SerializableObject from '../../serializableObj'

export interface NiaRemoveModifierEventSerialized {
  keyboardPath: string
  keyCode: number
}

export class NiaRemoveModifierEvent implements SerializableObject<NiaRemoveModifierEvent, NiaRemoveModifierEventSerialized> {
  private readonly keyboardPath: string
  private readonly keyCode: number

  constructor(keyboardPath: string, keyCode: number) {
    this.keyboardPath = keyboardPath
    this.keyCode = keyCode
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  static deserialize(b: NiaRemoveModifierEventSerialized): NiaRemoveModifierEvent {
    return new NiaRemoveModifierEvent(
      b.keyboardPath,
      b.keyCode
    );
  }

  serialize(): NiaRemoveModifierEventSerialized {
    return {
      keyboardPath: this.keyboardPath,
      keyCode: this.keyCode,
    }
  }
}
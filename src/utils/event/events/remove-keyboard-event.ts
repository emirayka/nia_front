import {
  NiaEvent
} from '@/utils/event'
import SerializableObject from '../../serializableObj'

export interface NiaRemoveKeyboardEventSerialized {
  keyboardPath: string
}

export class NiaRemoveKeyboardEvent implements SerializableObject<NiaRemoveKeyboardEvent, NiaRemoveKeyboardEventSerialized> {
  private readonly keyboardPath: string

  constructor(keyboardPath: string) {
    this.keyboardPath = keyboardPath
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  static deserialize(b: NiaRemoveKeyboardEventSerialized): NiaRemoveKeyboardEvent {
    return new NiaRemoveKeyboardEvent(
      b.keyboardPath
    );
  }

  serialize(): NiaRemoveKeyboardEventSerialized {
    return {
      keyboardPath: this.keyboardPath
    }
  }
}

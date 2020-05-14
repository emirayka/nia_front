import {
  NiaEvent
} from '@/utils/event'

import SerializableObject from '../../serializableObj'

export interface NiaDefineModifierEventSerialized {
  keyboardPath: string
  keyCode: number
  modifierAlias: string
}

export class NiaDefineModifierEvent implements SerializableObject<NiaDefineModifierEvent, NiaDefineModifierEventSerialized> {
  private readonly keyboardPath: string
  private readonly keyCode: number
  private readonly modifierAlias: string

  constructor(keyboardPath: string, keyCode: number, modifierAlias: string) {
    this.keyboardPath = keyboardPath
    this.keyCode = keyCode
    this.modifierAlias = modifierAlias
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getModifierAlias(): string {
    return this.modifierAlias
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineModifierEventSerialized {
    return {
      keyboardPath: this.keyboardPath,
      keyCode: this.keyCode,
      modifierAlias: this.modifierAlias,
    }
  }

  static deserialize(obj: NiaDefineModifierEventSerialized): NiaDefineModifierEvent {
    return new NiaDefineModifierEvent(
      obj.keyboardPath,
      obj.keyCode,
      obj.modifierAlias,
    )
  }
}

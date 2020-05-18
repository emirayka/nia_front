import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineModifierEventObject {
  keyboardId: number
  keyCode: number
  modifierAlias: string
}

export type NiaDefineModifierEventSerialized = NiaDefineModifierEventObject

export class NiaDefineModifierEvent implements SerializableObject<NiaDefineModifierEvent, NiaDefineModifierEventSerialized> {
  private readonly keyboardId: number
  private readonly keyCode: number
  private readonly modifierAlias: string

  constructor(args: NiaDefineModifierEventObject) {
    this.keyboardId = args.keyboardId
    this.keyCode = args.keyCode
    this.modifierAlias = args.modifierAlias
  }

  getDeviceId(): number {
    return this.keyboardId
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getModifierAlias(): string {
    return this.modifierAlias
  }

  getEventType(): NiaEventType {
    return NiaEventType.DefineModifier
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineModifierEventSerialized {
    return {
      keyboardId: this.keyboardId,
      keyCode: this.keyCode,
      modifierAlias: this.modifierAlias
    }
  }

  static deserialize(obj: NiaDefineModifierEventSerialized): NiaDefineModifierEvent {
    const args: NiaDefineModifierEventObject = obj

    return new NiaDefineModifierEvent(args)
  }
}

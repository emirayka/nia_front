import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaModifierDescription, NiaModifierDescriptionSerialized} from '@/utils'

export interface NiaDefineModifierEventObject {
  modifier: NiaModifierDescription
}

export type NiaDefineModifierEventSerialized = {
  modifierSerialized: NiaModifierDescriptionSerialized
}

export class NiaDefineModifierEvent implements SerializableObject<NiaDefineModifierEvent, NiaDefineModifierEventSerialized> {
  private readonly modifier: NiaModifierDescription

  constructor(args: NiaDefineModifierEventObject) {
    this.modifier = args.modifier
  }

  getModifier(): NiaModifierDescription {
    return this.modifier
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
      modifierSerialized: this.modifier.serialize()
    }
  }

  static deserialize(obj: NiaDefineModifierEventSerialized): NiaDefineModifierEvent {
    const args: NiaDefineModifierEventObject = {
      modifier: NiaModifierDescription.deserialize(obj.modifierSerialized)
    }

    return new NiaDefineModifierEvent(args)
  }
}

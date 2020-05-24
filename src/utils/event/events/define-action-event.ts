import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaAction, NiaActionSerialized} from '@/utils'
import {NiaNamedAction, NiaNamedActionSerialized} from '@/utils/domain/action/named-action'

export interface NiaDefineActionEventObject {
  namedAction: NiaNamedAction
}

export type NiaDefineActionEventSerialized = {
  namedActionSerialized: NiaNamedActionSerialized
}

export class NiaDefineActionEvent implements SerializableObject<NiaDefineActionEvent, NiaDefineActionEventSerialized> {
  private readonly namedAction: NiaNamedAction

  constructor(args: NiaDefineActionEventObject) {
    this.namedAction = args.namedAction
  }

  getNamedAction(): NiaNamedAction {
    return this.namedAction
  }

  getEventType(): NiaEventType {
    return NiaEventType.DefineAction
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineActionEventSerialized {
    return {
      namedActionSerialized: this.namedAction.serialize()
    }
  }

  static deserialize(serialized: NiaDefineActionEventSerialized): NiaDefineActionEvent {
    const args: NiaDefineActionEventObject = {
      namedAction: NiaNamedAction.deserialize(serialized.namedActionSerialized)
    }

    return new NiaDefineActionEvent(args)
  }
}

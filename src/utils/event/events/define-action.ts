import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaAction, NiaActionSerialized} from '@/utils'

export interface NiaDefineActionEventObject {
  action: NiaAction
}

export type NiaDefineActionEventSerialized = {
  actionSerialized: NiaActionSerialized
}

export class NiaDefineActionEvent implements SerializableObject<NiaDefineActionEvent, NiaDefineActionEventSerialized> {
  private readonly action: NiaAction

  constructor(args: NiaDefineActionEventObject) {
    this.action = args.action
  }

  getAction(): NiaAction {
    return this.action
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
      actionSerialized: this.action.serialize()
    }
  }

  static deserialize(serialized: NiaDefineActionEventSerialized): NiaDefineActionEvent {
    const args: NiaDefineActionEventObject = {
      action: NiaAction.deserialize(serialized.actionSerialized)
    }

    return new NiaDefineActionEvent(args)
  }
}

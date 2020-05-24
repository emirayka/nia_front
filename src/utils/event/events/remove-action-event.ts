import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaAction, NiaActionSerialized} from '@/utils'

export interface NiaRemoveActionEventObject {
  actionName: string
}

export type NiaRemoveActionEventSerialized = NiaRemoveActionEventObject

export class NiaRemoveActionEvent implements SerializableObject<NiaRemoveActionEvent, NiaRemoveActionEventSerialized> {
  private readonly actionName: string

  constructor(args: NiaRemoveActionEventObject) {
    this.actionName = args.actionName
  }

  getActionName(): string {
    return this.actionName
  }

  getEventType(): NiaEventType {
    return NiaEventType.RemoveAction
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaRemoveActionEventSerialized {
    return {
      actionName: this.actionName
    }
  }

  static deserialize(serialized: NiaRemoveActionEventSerialized): NiaRemoveActionEvent {
    return new NiaRemoveActionEvent(serialized)
  }
}

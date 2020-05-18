import {ActionWait} from 'nia-protocol-js'

import {
  NiaActionTextTypeSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionWaitObject {
  ms: number
}

export type NiaActionWaitSerialized = NiaActionWaitObject

export class NiaActionWait implements SerializablePB<NiaActionWait, ActionWait>, SerializableObject<NiaActionWait, NiaActionWaitSerialized> {
  private readonly ms: number

  constructor(args: NiaActionWaitObject) {
    this.ms = args.ms
  }

  getActionType(): NiaActionType {
    return NiaActionType.Wait
  }

  getMs(): number {
    return this.ms
  }

  toAction(name: string): NiaAction {
    return new NiaAction({
      actionName: name,
      action: this,
    })
  }

  toPB(): ActionWait {
    const actionWait: ActionWait = new ActionWait()

    actionWait.setMs(this.ms)

    return actionWait
  }

  static fromPB(actionWait: ActionWait): NiaActionWait {
    const niaActionWait: NiaActionWait = new NiaActionWait({
      ms: actionWait.getMs()
  })

    return niaActionWait
  }

  serialize(): NiaActionWaitSerialized {
    return {
      ms: this.ms
    };
  }

  static deserialize(serialized: NiaActionWaitSerialized): NiaActionWait {
    return new NiaActionWait(serialized)
  }
}

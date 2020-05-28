import {ActionWait} from 'nia-protocol-js'

import {
  NiaActionTextTypeSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionWaitObject {
  ms: number
}

export type NiaActionWaitSerialized = NiaActionWaitObject

export class NiaActionWait implements
  NiaBasicAction,
  SerializablePB<NiaActionWait, ActionWait>,
  SerializableObject<NiaActionWait, NiaActionWaitSerialized> {
  private readonly ms: number

  constructor(args: NiaActionWaitObject) {
    this.ms = args.ms
  }

  getActionType(): NiaActionType {
    return NiaActionType.Wait
  }

  getActionTypeName(): string {
    return 'Wait'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.ms}ms`
  }

  secondArgument(): string {
    return ''
  }

  getMs(): number {
    return this.ms
  }

  toAction(): NiaAction {
    return new NiaAction({
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

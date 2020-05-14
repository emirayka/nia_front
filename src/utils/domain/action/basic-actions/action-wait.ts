import {ActionWait} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionWait implements SerializablePB<NiaActionWait, ActionWait> {
  private readonly ms: number

  constructor(ms: number) {
    this.ms = ms
  }

  getActionType(): NiaActionType {
    return NiaActionType.Wait
  }

  getMs(): number {
    return this.ms
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionWait {
    const actionWait: ActionWait = new ActionWait()

    actionWait.setMs(this.ms)

    return actionWait
  }

  static fromPB(actionWait: ActionWait): NiaActionWait {
    const niaActionWait: NiaActionWait = new NiaActionWait(
      actionWait.getMs()
    )

    return niaActionWait
  }
}

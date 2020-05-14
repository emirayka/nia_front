import {ActionKeyClick} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionKeyClick implements SerializablePB<NiaActionKeyClick, ActionKeyClick> {
  private readonly keyCode: number

  constructor(keyCode: number) {
    this.keyCode = keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyClick
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionKeyClick {
    const actionKeyClick: ActionKeyClick = new ActionKeyClick()

    actionKeyClick.setKeyCode(this.keyCode)

    return actionKeyClick
  }

  static fromPB(actionKeyClick: ActionKeyClick): NiaActionKeyClick {
    const niaActionKeyClick: NiaActionKeyClick = new NiaActionKeyClick(
      actionKeyClick.getKeyCode()
    )

    return niaActionKeyClick
  }
}

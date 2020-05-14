import {ActionKeyPress} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionKeyPress implements SerializablePB<NiaActionKeyPress, ActionKeyPress> {
  private readonly keyCode: number

  constructor(keyCode: number) {
    this.keyCode = keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyPress
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionKeyPress {
    const actionKeyPress: ActionKeyPress = new ActionKeyPress()

    actionKeyPress.setKeyCode(this.keyCode)

    return actionKeyPress
  }

  static fromPB(actionKeyPress: ActionKeyPress): NiaActionKeyPress {
    const niaActionKeyPress: NiaActionKeyPress = new NiaActionKeyPress(
      actionKeyPress.getKeyCode()
    )

    return niaActionKeyPress
  }
}
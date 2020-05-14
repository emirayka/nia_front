import {ActionKeyRelease} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionKeyRelease implements SerializablePB<NiaActionKeyRelease, ActionKeyRelease> {
  private readonly keyCode: number

  constructor(keyCode: number) {
    this.keyCode = keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyRelease
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionKeyRelease {
    const actionKeyRelease: ActionKeyRelease = new ActionKeyRelease()

    actionKeyRelease.setKeyCode(this.keyCode)

    return actionKeyRelease
  }

  static fromPB(actionKeyRelease: ActionKeyRelease): NiaActionKeyRelease {
    const niaActionKeyRelease: NiaActionKeyRelease = new NiaActionKeyRelease(
      actionKeyRelease.getKeyCode()
    )

    return niaActionKeyRelease
  }
}

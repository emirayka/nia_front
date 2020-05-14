import {ActionMouseButtonRelease} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionMouseButtonRelease implements SerializablePB<NiaActionMouseButtonRelease, ActionMouseButtonRelease> {
  private readonly buttonCode: number

  constructor(buttonCode: number) {
    this.buttonCode = buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonRelease
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionMouseButtonRelease {
    const actionMouseButtonRelease: ActionMouseButtonRelease = new ActionMouseButtonRelease()

    actionMouseButtonRelease.setButtonCode(this.buttonCode)

    return actionMouseButtonRelease
  }

  static fromPB(actionMouseButtonRelease: ActionMouseButtonRelease): NiaActionMouseButtonRelease {
    const niaActionMouseButtonRelease: NiaActionMouseButtonRelease = new NiaActionMouseButtonRelease(
      actionMouseButtonRelease.getButtonCode()
    )

    return niaActionMouseButtonRelease
  }
}

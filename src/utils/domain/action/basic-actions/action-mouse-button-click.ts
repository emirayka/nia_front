import {ActionMouseButtonClick} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionMouseButtonClick implements SerializablePB<NiaActionMouseButtonClick, ActionMouseButtonClick> {
  private readonly buttonCode: number

  constructor(buttonCode: number) {
    this.buttonCode = buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonClick
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionMouseButtonClick {
    const actionMouseButtonClick: ActionMouseButtonClick = new ActionMouseButtonClick()

    actionMouseButtonClick.setButtonCode(this.buttonCode)

    return actionMouseButtonClick
  }

  static fromPB(actionMouseButtonClick: ActionMouseButtonClick): NiaActionMouseButtonClick {
    const niaActionMouseButtonClick: NiaActionMouseButtonClick = new NiaActionMouseButtonClick(
      actionMouseButtonClick.getButtonCode()
    )

    return niaActionMouseButtonClick
  }
}

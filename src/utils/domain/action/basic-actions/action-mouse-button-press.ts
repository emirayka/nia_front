import {ActionMouseButtonPress} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionMouseButtonPress implements SerializablePB<NiaActionMouseButtonPress, ActionMouseButtonPress> {
  private readonly buttonCode: number

  constructor(buttonCode: number) {
    this.buttonCode = buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonPress
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionMouseButtonPress {
    const actionMouseButtonPress: ActionMouseButtonPress = new ActionMouseButtonPress()

    actionMouseButtonPress.setButtonCode(this.buttonCode)

    return actionMouseButtonPress
  }

  static fromPB(actionMouseButtonPress: ActionMouseButtonPress): NiaActionMouseButtonPress {
    const niaActionMouseButtonPress: NiaActionMouseButtonPress = new NiaActionMouseButtonPress(
      actionMouseButtonPress.getButtonCode()
    )

    return niaActionMouseButtonPress
  }
}

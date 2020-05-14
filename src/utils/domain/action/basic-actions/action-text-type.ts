import {ActionTextType} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionTextType implements SerializablePB<NiaActionTextType, ActionTextType> {
  private readonly text: string

  constructor(text: string) {
    this.text = text
  }

  getActionType(): NiaActionType {
    return NiaActionType.TextType
  }

  getText(): string {
    return this.text
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionTextType {
    const actionTextType: ActionTextType = new ActionTextType()

    actionTextType.setText(this.text)

    return actionTextType
  }

  static fromPB(actionTextType: ActionTextType): NiaActionTextType {
    const niaActionTextType: NiaActionTextType = new NiaActionTextType(
      actionTextType.getText()
    )

    return niaActionTextType
  }
}

import {ActionMouseButtonPress} from 'nia-protocol-js'

import {
  NiaActionMouseButtonClickSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionMouseButtonPressObject {
  buttonCode: number
}

export type NiaActionMouseButtonPressSerialized = NiaActionMouseButtonPressObject

export class NiaActionMouseButtonPress implements
  NiaBasicAction,
  SerializablePB<NiaActionMouseButtonPress, ActionMouseButtonPress>,
  SerializableObject<NiaActionMouseButtonPress, NiaActionMouseButtonPressSerialized> {
  private readonly buttonCode: number

  constructor(args: NiaActionMouseButtonPressObject) {
    this.buttonCode = args.buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonPress
  }

  getActionTypeName(): string {
    return 'Mouse button press'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.buttonCode}`
  }

  secondArgument(): string {
    return ''
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionMouseButtonPress {
    const actionMouseButtonPress: ActionMouseButtonPress = new ActionMouseButtonPress()

    actionMouseButtonPress.setButtonCode(this.buttonCode)

    return actionMouseButtonPress
  }

  static fromPB(actionMouseButtonPress: ActionMouseButtonPress): NiaActionMouseButtonPress {
    const niaActionMouseButtonPress: NiaActionMouseButtonPress = new NiaActionMouseButtonPress({
      buttonCode: actionMouseButtonPress.getButtonCode()
  })

    return niaActionMouseButtonPress
  }

  serialize(): NiaActionMouseButtonPressSerialized {
    return {
      buttonCode: this.buttonCode
    }
  }

  static deserialize(serialized: NiaActionMouseButtonPressSerialized): NiaActionMouseButtonPress {
    return new NiaActionMouseButtonPress(serialized)
  }
}

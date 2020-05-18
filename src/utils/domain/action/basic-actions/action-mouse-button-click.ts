import {ActionMouseButtonClick} from 'nia-protocol-js'

import {
  NiaActionMouseAbsoluteMoveSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionMouseButtonClickObject {
  buttonCode: number
}

export type NiaActionMouseButtonClickSerialized = NiaActionMouseButtonClickObject

export class NiaActionMouseButtonClick implements SerializablePB<NiaActionMouseButtonClick, ActionMouseButtonClick>, SerializableObject<NiaActionMouseButtonClick, NiaActionMouseButtonClickSerialized> {
  private readonly buttonCode: number

  constructor(args: NiaActionMouseButtonClickObject) {
    this.buttonCode = args.buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonClick
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(name: string): NiaAction {
    return new NiaAction({
      actionName: name,
      action: this,
    })
  }

  toPB(): ActionMouseButtonClick {
    const actionMouseButtonClick: ActionMouseButtonClick = new ActionMouseButtonClick()

    actionMouseButtonClick.setButtonCode(this.buttonCode)

    return actionMouseButtonClick
  }

  static fromPB(actionMouseButtonClick: ActionMouseButtonClick): NiaActionMouseButtonClick {
    const niaActionMouseButtonClick: NiaActionMouseButtonClick = new NiaActionMouseButtonClick({
      buttonCode: actionMouseButtonClick.getButtonCode()
  })

    return niaActionMouseButtonClick
  }

  serialize(): NiaActionMouseButtonClickSerialized {
    return {
      buttonCode: this.buttonCode
    }
  }

  static deserialize(serialized: NiaActionMouseButtonClickSerialized): NiaActionMouseButtonClick {
    return new NiaActionMouseButtonClick(serialized)
  }
}

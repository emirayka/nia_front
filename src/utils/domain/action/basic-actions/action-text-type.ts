import {ActionTextType} from 'nia-protocol-js'

import {
  NiaActionExecuteFunctionSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionTextTypeObject {
  text: string
}

export type NiaActionTextTypeSerialized = NiaActionTextTypeObject

export class NiaActionTextType implements SerializablePB<NiaActionTextType, ActionTextType>, SerializableObject<NiaActionTextType, NiaActionTextTypeSerialized> {
  private readonly text: string

  constructor(args: NiaActionTextTypeObject) {
    this.text = args.text
  }

  getActionType(): NiaActionType {
    return NiaActionType.TextType
  }

  getText(): string {
    return this.text
  }

  toAction(name: string): NiaAction {
    return new NiaAction({
      actionName: name,
      action: this,
    })
  }

  toPB(): ActionTextType {
    const actionTextType: ActionTextType = new ActionTextType()

    actionTextType.setText(this.text)

    return actionTextType
  }

  static fromPB(actionTextType: ActionTextType): NiaActionTextType {
    const niaActionTextType: NiaActionTextType = new NiaActionTextType({
      text: actionTextType.getText()
  })

    return niaActionTextType
  }

  serialize(): NiaActionTextTypeSerialized {
    return {
      text: this.text
    };
  }

  static deserialize(serialized: NiaActionTextTypeSerialized): NiaActionTextType {
    return new NiaActionTextType(serialized)
  }
}

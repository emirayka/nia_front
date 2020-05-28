import {ActionTextType} from 'nia-protocol-js'

import {
  NiaActionExecuteFunctionSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionTextTypeObject {
  text: string
}

export type NiaActionTextTypeSerialized = NiaActionTextTypeObject

export class NiaActionTextType implements
  NiaBasicAction,
  SerializablePB<NiaActionTextType, ActionTextType>,
  SerializableObject<NiaActionTextType, NiaActionTextTypeSerialized> {
  private readonly text: string

  constructor(args: NiaActionTextTypeObject) {
    this.text = args.text
  }

  getActionType(): NiaActionType {
    return NiaActionType.TextType
  }

  getActionTypeName(): string {
    return 'Type text'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.text}`
  }

  secondArgument(): string {
    return ''
  }

  getText(): string {
    return this.text
  }

  toAction(): NiaAction {
    return new NiaAction({
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

import {ActionTextKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionTextKeyClickObject {
  keyCode: number
}

export type NiaActionTextKeyClickSerialized = NiaActionTextKeyClickObject

export class NiaActionTextKeyClick implements
  NiaBasicAction,
  SerializablePB<NiaActionTextKeyClick, ActionTextKeyClick>,
  SerializableObject<NiaActionTextKeyClick, NiaActionTextKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionTextKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.TextKeyClick
  }

  getActionTypeName(): string {
    return 'Key click'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.keyCode}`
  }

  secondArgument(): string {
    return ''
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionTextKeyClick {
    const actionTextKeyClick: ActionTextKeyClick = new ActionTextKeyClick()

    actionTextKeyClick.setKeyCode(this.keyCode)

    return actionTextKeyClick
  }

  static fromPB(actionTextKeyClick: ActionTextKeyClick): NiaActionTextKeyClick {
    const niaActionTextKeyClick: NiaActionTextKeyClick = new NiaActionTextKeyClick({
      keyCode:actionTextKeyClick.getKeyCode()
    })

    return niaActionTextKeyClick
  }

  serialize(): NiaActionTextKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionTextKeyClickSerialized): NiaActionTextKeyClick {
    return new NiaActionTextKeyClick(serialized)
  }
}

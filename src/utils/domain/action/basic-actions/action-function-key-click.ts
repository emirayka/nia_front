import {ActionFunctionKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionFunctionKeyClickObject {
  keyCode: number
}

export type NiaActionFunctionKeyClickSerialized = NiaActionFunctionKeyClickObject

export class NiaActionFunctionKeyClick implements
  NiaBasicAction,
  SerializablePB<NiaActionFunctionKeyClick, ActionFunctionKeyClick>,
  SerializableObject<NiaActionFunctionKeyClick, NiaActionFunctionKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionFunctionKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.FunctionKeyClick
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

  toPB(): ActionFunctionKeyClick {
    const actionFunctionKeyClick: ActionFunctionKeyClick = new ActionFunctionKeyClick()

    actionFunctionKeyClick.setKeyCode(this.keyCode)

    return actionFunctionKeyClick
  }

  static fromPB(actionFunctionKeyClick: ActionFunctionKeyClick): NiaActionFunctionKeyClick {
    const niaActionFunctionKeyClick: NiaActionFunctionKeyClick = new NiaActionFunctionKeyClick({
      keyCode:actionFunctionKeyClick.getKeyCode()
    })

    return niaActionFunctionKeyClick
  }

  serialize(): NiaActionFunctionKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionFunctionKeyClickSerialized): NiaActionFunctionKeyClick {
    return new NiaActionFunctionKeyClick(serialized)
  }
}

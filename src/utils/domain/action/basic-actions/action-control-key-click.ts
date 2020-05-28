import {ActionControlKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionControlKeyClickObject {
  keyCode: number
}

export type NiaActionControlKeyClickSerialized = NiaActionControlKeyClickObject

export class NiaActionControlKeyClick implements
  NiaBasicAction,
  SerializablePB<NiaActionControlKeyClick, ActionControlKeyClick>,
  SerializableObject<NiaActionControlKeyClick, NiaActionControlKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionControlKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.ControlKeyClick
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

  toPB(): ActionControlKeyClick {
    const actionControlKeyClick: ActionControlKeyClick = new ActionControlKeyClick()

    actionControlKeyClick.setKeyCode(this.keyCode)

    return actionControlKeyClick
  }

  static fromPB(actionControlKeyClick: ActionControlKeyClick): NiaActionControlKeyClick {
    const niaActionControlKeyClick: NiaActionControlKeyClick = new NiaActionControlKeyClick({
      keyCode:actionControlKeyClick.getKeyCode()
    })

    return niaActionControlKeyClick
  }

  serialize(): NiaActionControlKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionControlKeyClickSerialized): NiaActionControlKeyClick {
    return new NiaActionControlKeyClick(serialized)
  }
}

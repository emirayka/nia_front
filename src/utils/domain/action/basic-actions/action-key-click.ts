import {ActionKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionKeyClickObject {
  keyCode: number
}

export type NiaActionKeyClickSerialized = NiaActionKeyClickObject

export class NiaActionKeyClick implements
  NiaBasicAction,
  SerializablePB<NiaActionKeyClick, ActionKeyClick>,
  SerializableObject<NiaActionKeyClick, NiaActionKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyClick
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

  toPB(): ActionKeyClick {
    const actionKeyClick: ActionKeyClick = new ActionKeyClick()

    actionKeyClick.setKeyCode(this.keyCode)

    return actionKeyClick
  }

  static fromPB(actionKeyClick: ActionKeyClick): NiaActionKeyClick {
    const niaActionKeyClick: NiaActionKeyClick = new NiaActionKeyClick({
      keyCode:actionKeyClick.getKeyCode()
    })

    return niaActionKeyClick
  }

  serialize(): NiaActionKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionKeyClickSerialized): NiaActionKeyClick {
    return new NiaActionKeyClick(serialized)
  }
}

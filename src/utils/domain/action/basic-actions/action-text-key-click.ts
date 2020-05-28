import {ActionTextKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionTextKeyClickObject {
  keyCode: number
}

export type NiaActionTextKeyClickSerialized = NiaActionTextKeyClickObject

export class NiaActionTextKeyClick implements SerializablePB<NiaActionTextKeyClick, ActionTextKeyClick>, SerializableObject<NiaActionTextKeyClick, NiaActionTextKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionTextKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.TextKeyClick
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

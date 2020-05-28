import {ActionKPKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionKPKeyClickObject {
  keyCode: number
}

export type NiaActionKPKeyClickSerialized = NiaActionKPKeyClickObject

export class NiaActionKPKeyClick implements SerializablePB<NiaActionKPKeyClick, ActionKPKeyClick>, SerializableObject<NiaActionKPKeyClick, NiaActionKPKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionKPKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KPKeyClick
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionKPKeyClick {
    const actionKPKeyClick: ActionKPKeyClick = new ActionKPKeyClick()

    actionKPKeyClick.setKeyCode(this.keyCode)

    return actionKPKeyClick
  }

  static fromPB(actionKPKeyClick: ActionKPKeyClick): NiaActionKPKeyClick {
    const niaActionKPKeyClick: NiaActionKPKeyClick = new NiaActionKPKeyClick({
      keyCode: actionKPKeyClick.getKeyCode()
    })

    return niaActionKPKeyClick
  }

  serialize(): NiaActionKPKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionKPKeyClickSerialized): NiaActionKPKeyClick {
    return new NiaActionKPKeyClick(serialized)
  }
}

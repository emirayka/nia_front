import {ActionNumberKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionNumberKeyClickObject {
  keyCode: number
}

export type NiaActionNumberKeyClickSerialized = NiaActionNumberKeyClickObject

export class NiaActionNumberKeyClick implements SerializablePB<NiaActionNumberKeyClick, ActionNumberKeyClick>, SerializableObject<NiaActionNumberKeyClick, NiaActionNumberKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionNumberKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.NumberKeyClick
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionNumberKeyClick {
    const actionNumberKeyClick: ActionNumberKeyClick = new ActionNumberKeyClick()

    actionNumberKeyClick.setKeyCode(this.keyCode)

    return actionNumberKeyClick
  }

  static fromPB(actionNumberKeyClick: ActionNumberKeyClick): NiaActionNumberKeyClick {
    const niaActionNumberKeyClick: NiaActionNumberKeyClick = new NiaActionNumberKeyClick({
      keyCode:actionNumberKeyClick.getKeyCode()
    })

    return niaActionNumberKeyClick
  }

  serialize(): NiaActionNumberKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionNumberKeyClickSerialized): NiaActionNumberKeyClick {
    return new NiaActionNumberKeyClick(serialized)
  }
}

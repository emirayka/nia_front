import {ActionMouseButtonKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionMouseButtonKeyClickObject {
  keyCode: number
}

export type NiaActionMouseButtonKeyClickSerialized = NiaActionMouseButtonKeyClickObject

export class NiaActionMouseButtonKeyClick implements SerializablePB<NiaActionMouseButtonKeyClick, ActionMouseButtonKeyClick>, SerializableObject<NiaActionMouseButtonKeyClick, NiaActionMouseButtonKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionMouseButtonKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonKeyClick
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionMouseButtonKeyClick {
    const actionMouseButtonKeyClick: ActionMouseButtonKeyClick = new ActionMouseButtonKeyClick()

    actionMouseButtonKeyClick.setKeyCode(this.keyCode)

    return actionMouseButtonKeyClick
  }

  static fromPB(actionMouseButtonKeyClick: ActionMouseButtonKeyClick): NiaActionMouseButtonKeyClick {
    const niaActionMouseButtonKeyClick: NiaActionMouseButtonKeyClick = new NiaActionMouseButtonKeyClick({
      keyCode:actionMouseButtonKeyClick.getKeyCode()
    })

    return niaActionMouseButtonKeyClick
  }

  serialize(): NiaActionMouseButtonKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionMouseButtonKeyClickSerialized): NiaActionMouseButtonKeyClick {
    return new NiaActionMouseButtonKeyClick(serialized)
  }
}

import {ActionKeyPress} from 'nia-protocol-js'

import {
  NiaActionKeyClickSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionKeyPressObject {
  keyCode: number
}

export type NiaActionKeyPressSerialized = NiaActionKeyPressObject

export class NiaActionKeyPress implements
  NiaBasicAction,
  SerializablePB<NiaActionKeyPress, ActionKeyPress>,
  SerializableObject<NiaActionKeyPress, NiaActionKeyPressSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionKeyPressObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyPress
  }

  getActionTypeName(): string {
    return 'Key press'
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

  toPB(): ActionKeyPress {
    const actionKeyPress: ActionKeyPress = new ActionKeyPress()

    actionKeyPress.setKeyCode(this.keyCode)

    return actionKeyPress
  }

  static fromPB(actionKeyPress: ActionKeyPress): NiaActionKeyPress {
    const niaActionKeyPress: NiaActionKeyPress = new NiaActionKeyPress({
      keyCode: actionKeyPress.getKeyCode(),
    })

    return niaActionKeyPress
  }

  serialize(): NiaActionKeyPressSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionKeyPressSerialized): NiaActionKeyPress {
    return new NiaActionKeyPress(serialized)
  }
}
import {ActionMultimediaKeyClick} from 'nia-protocol-js'

import {
  NiaActionExecuteOSCommandSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionMultimediaKeyClickObject {
  keyCode: number
}

export type NiaActionMultimediaKeyClickSerialized = NiaActionMultimediaKeyClickObject

export class NiaActionMultimediaKeyClick implements
  NiaBasicAction,
  SerializablePB<NiaActionMultimediaKeyClick, ActionMultimediaKeyClick>,
  SerializableObject<NiaActionMultimediaKeyClick, NiaActionMultimediaKeyClickSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionMultimediaKeyClickObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MultimediaKeyClick
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

  toPB(): ActionMultimediaKeyClick {
    const actionMultimediaKeyClick: ActionMultimediaKeyClick = new ActionMultimediaKeyClick()

    actionMultimediaKeyClick.setKeyCode(this.keyCode)

    return actionMultimediaKeyClick
  }

  static fromPB(actionMultimediaKeyClick: ActionMultimediaKeyClick): NiaActionMultimediaKeyClick {
    const niaActionMultimediaKeyClick: NiaActionMultimediaKeyClick = new NiaActionMultimediaKeyClick({
      keyCode:actionMultimediaKeyClick.getKeyCode()
    })

    return niaActionMultimediaKeyClick
  }

  serialize(): NiaActionMultimediaKeyClickSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionMultimediaKeyClickSerialized): NiaActionMultimediaKeyClick {
    return new NiaActionMultimediaKeyClick(serialized)
  }
}

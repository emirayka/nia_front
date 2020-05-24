import {ActionKeyRelease} from 'nia-protocol-js'

import {
  NiaActionKeyPressSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionKeyReleaseObject {
  keyCode: number
}

export type NiaActionKeyReleaseSerialized = NiaActionKeyReleaseObject

export class NiaActionKeyRelease implements SerializablePB<NiaActionKeyRelease, ActionKeyRelease>, SerializableObject<NiaActionKeyRelease, NiaActionKeyReleaseSerialized> {
  private readonly keyCode: number

  constructor(args: NiaActionKeyReleaseObject) {
    this.keyCode = args.keyCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.KeyRelease
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionKeyRelease {
    const actionKeyRelease: ActionKeyRelease = new ActionKeyRelease()

    actionKeyRelease.setKeyCode(this.keyCode)

    return actionKeyRelease
  }

  static fromPB(actionKeyRelease: ActionKeyRelease): NiaActionKeyRelease {
    const niaActionKeyRelease: NiaActionKeyRelease = new NiaActionKeyRelease({
      keyCode: actionKeyRelease.getKeyCode(),
    })

    return niaActionKeyRelease
  }

  serialize(): NiaActionKeyReleaseSerialized {
    return {
      keyCode: this.keyCode
    }
  }

  static deserialize(serialized: NiaActionKeyReleaseSerialized): NiaActionKeyRelease {
    return new NiaActionKeyRelease(serialized)
  }
}

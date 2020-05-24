import {ActionMouseButtonRelease} from 'nia-protocol-js'

import {
  NiaActionMouseButtonPressSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionMouseButtonReleaseObject {
  buttonCode: number
}

export type NiaActionMouseButtonReleaseSerialized = NiaActionMouseButtonReleaseObject

export class NiaActionMouseButtonRelease implements SerializablePB<NiaActionMouseButtonRelease, ActionMouseButtonRelease>, SerializableObject<NiaActionMouseButtonRelease, NiaActionMouseButtonReleaseSerialized> {
  private readonly buttonCode: number

  constructor(args: NiaActionMouseButtonReleaseObject) {
    this.buttonCode = args.buttonCode
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseButtonRelease
  }

  getButtonCode(): number {
    return this.buttonCode
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionMouseButtonRelease {
    const actionMouseButtonRelease: ActionMouseButtonRelease = new ActionMouseButtonRelease()

    actionMouseButtonRelease.setButtonCode(this.buttonCode)

    return actionMouseButtonRelease
  }

  static fromPB(actionMouseButtonRelease: ActionMouseButtonRelease): NiaActionMouseButtonRelease {
    const niaActionMouseButtonRelease: NiaActionMouseButtonRelease = new NiaActionMouseButtonRelease({
      buttonCode: actionMouseButtonRelease.getButtonCode()
  })

    return niaActionMouseButtonRelease
  }

  serialize(): NiaActionMouseButtonReleaseSerialized {
    return {
      buttonCode: this.buttonCode
    }
  }

  static deserialize(serialized: NiaActionMouseButtonReleaseSerialized): NiaActionMouseButtonRelease {
    return new NiaActionMouseButtonRelease(serialized)
  }
}

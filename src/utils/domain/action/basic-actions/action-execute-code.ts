import {ActionExecuteCode} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionExecuteCodeObject {
  code: string
}

export type NiaActionExecuteCodeSerialized = NiaActionExecuteCodeObject

export class NiaActionExecuteCode implements
  NiaBasicAction,
  SerializablePB<NiaActionExecuteCode, ActionExecuteCode>,
  SerializableObject<NiaActionExecuteCode, NiaActionExecuteCodeSerialized> {
  private readonly code: string

  constructor(args: NiaActionExecuteCodeObject) {
    this.code = args.code
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteCode
  }

  getActionTypeName(): string {
    return 'Execute code'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.code}`
  }

  secondArgument(): string {
    return ''
  }


  getCode(): string {
    return this.code
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionExecuteCode {
    const actionExecuteCode: ActionExecuteCode = new ActionExecuteCode()

    actionExecuteCode.setCode(this.code)

    return actionExecuteCode
  }

  static fromPB(actionExecuteCode: ActionExecuteCode): NiaActionExecuteCode {
    const niaActionExecuteCode: NiaActionExecuteCode = new NiaActionExecuteCode(
      {
        code: actionExecuteCode.getCode()
      }
    )

    return niaActionExecuteCode
  }

  serialize(): NiaActionExecuteCodeSerialized {
    return {
      code: this.code
    }
  }

  static deserialize(serialized: NiaActionExecuteCodeSerialized): NiaActionExecuteCode {
    return new NiaActionExecuteCode(serialized)
  }
}

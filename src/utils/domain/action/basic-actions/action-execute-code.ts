import {ActionExecuteCode} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionExecuteCode implements SerializablePB<NiaActionExecuteCode, ActionExecuteCode> {
  private readonly code: string

  constructor(code: string) {
    this.code = code
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteCode
  }

  getCode(): string {
    return this.code
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionExecuteCode {
    const actionExecuteCode: ActionExecuteCode = new ActionExecuteCode()

    actionExecuteCode.setCode(this.code)

    return actionExecuteCode
  }

  static fromPB(actionExecuteCode: ActionExecuteCode): NiaActionExecuteCode {
    const niaActionExecuteCode: NiaActionExecuteCode = new NiaActionExecuteCode(
      actionExecuteCode.getCode()
    )

    return niaActionExecuteCode
  }
}

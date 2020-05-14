import {ActionExecuteFunction} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionExecuteFunction implements SerializablePB<NiaActionExecuteFunction, ActionExecuteFunction> {
  private readonly functionName: string

  constructor(functionName: string) {
    this.functionName = functionName
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteFunction
  }

  getFunctionName(): string {
    return this.functionName
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionExecuteFunction {
    const actionExecuteFunction: ActionExecuteFunction = new ActionExecuteFunction()

    actionExecuteFunction.setFunctionName(this.functionName)

    return actionExecuteFunction
  }

  static fromPB(actionExecuteFunction: ActionExecuteFunction): NiaActionExecuteFunction {
    const niaActionExecuteFunction: NiaActionExecuteFunction = new NiaActionExecuteFunction(
      actionExecuteFunction.getFunctionName()
    )

    return niaActionExecuteFunction
  }
}

import {ActionExecuteFunction} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionExecuteFunctionObject {
  functionName: string
}

export type NiaActionExecuteFunctionSerialized = NiaActionExecuteFunctionObject

export class NiaActionExecuteFunction implements
  NiaBasicAction,
  SerializablePB<NiaActionExecuteFunction, ActionExecuteFunction>,
  SerializableObject<NiaActionExecuteFunction, NiaActionExecuteFunctionSerialized> {
  private readonly functionName: string

  constructor(args: NiaActionExecuteFunctionObject) {
    this.functionName = args.functionName
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteFunction
  }

  getActionTypeName(): string {
    return 'Execute function'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.functionName}`
  }

  secondArgument(): string {
    return ''
  }


  getFunctionName(): string {
    return this.functionName
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionExecuteFunction {
    const actionExecuteFunction: ActionExecuteFunction = new ActionExecuteFunction()

    actionExecuteFunction.setFunctionName(this.functionName)

    return actionExecuteFunction
  }

  static fromPB(actionExecuteFunction: ActionExecuteFunction): NiaActionExecuteFunction {
    const niaActionExecuteFunction: NiaActionExecuteFunction = new NiaActionExecuteFunction({
      functionName: actionExecuteFunction.getFunctionName()
    })

    return niaActionExecuteFunction
  }

  serialize(): NiaActionExecuteFunctionSerialized {
    return {
      functionName: this.functionName
    };
  }

  static deserialize(serialized: NiaActionExecuteFunctionSerialized): NiaActionExecuteFunction {
    return new NiaActionExecuteFunction(serialized)
  }
}


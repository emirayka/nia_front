import {ActionExecuteFunction} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionExecuteFunctionObject {
  functionName: string
}

export type NiaActionExecuteFunctionSerialized = NiaActionExecuteFunctionObject

export class NiaActionExecuteFunction implements SerializablePB<NiaActionExecuteFunction, ActionExecuteFunction>, SerializableObject<NiaActionExecuteFunction, NiaActionExecuteFunctionSerialized> {
  private readonly functionName: string

  constructor(args: NiaActionExecuteFunctionObject) {
    this.functionName = args.functionName
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteFunction
  }

  getFunctionName(): string {
    return this.functionName
  }

  toAction(name: string): NiaAction {
    return new NiaAction({
      actionName: name,
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


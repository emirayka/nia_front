import {ActionExecuteInterpreterValue} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionExecuteInterpreterValueObject {
}

export type NiaActionExecuteInterpreterValueSerialized = NiaActionExecuteInterpreterValueObject

export class NiaActionExecuteInterpreterValue implements
  NiaBasicAction,
  SerializablePB<NiaActionExecuteInterpreterValue, ActionExecuteInterpreterValue>,
  SerializableObject<NiaActionExecuteInterpreterValue, NiaActionExecuteInterpreterValueSerialized> {

  constructor(args: NiaActionExecuteInterpreterValueObject) {
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteInterpreterValue
  }

  getActionTypeName(): string {
    return 'Execute action'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return ``
  }

  secondArgument(): string {
    return ''
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionExecuteInterpreterValue {
    const actionExecuteInterpreterValue: ActionExecuteInterpreterValue = new ActionExecuteInterpreterValue()

    return actionExecuteInterpreterValue
  }

  static fromPB(actionExecuteInterpreterValue: ActionExecuteInterpreterValue): NiaActionExecuteInterpreterValue {
    const niaActionExecuteInterpreterValue: NiaActionExecuteInterpreterValue = new NiaActionExecuteInterpreterValue({
    })

    return niaActionExecuteInterpreterValue
  }

  serialize(): NiaActionExecuteInterpreterValueSerialized {
    return {
    }
  }

  static deserialize(serialized: NiaActionExecuteInterpreterValueSerialized): NiaActionExecuteInterpreterValue {
    return new NiaActionExecuteInterpreterValue(serialized)
  }
}

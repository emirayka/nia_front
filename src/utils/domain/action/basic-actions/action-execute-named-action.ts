import {ActionExecuteNamedAction} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionExecuteNamedActionObject {
  actionName: string
}

export type NiaActionExecuteNamedActionSerialized = NiaActionExecuteNamedActionObject

export class NiaActionExecuteNamedAction implements
  NiaBasicAction,
  SerializablePB<NiaActionExecuteNamedAction, ActionExecuteNamedAction>,
  SerializableObject<NiaActionExecuteNamedAction, NiaActionExecuteNamedActionSerialized> {
  private readonly actionName: string

  constructor(args: NiaActionExecuteNamedActionObject) {
    this.actionName = args.actionName
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteNamedAction
  }

  getActionTypeName(): string {
    return 'Execute action'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.actionName}`
  }

  secondArgument(): string {
    return ''
  }

  getActionName(): string {
    return this.actionName
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionExecuteNamedAction {
    const actionExecuteNamedAction: ActionExecuteNamedAction = new ActionExecuteNamedAction()

    actionExecuteNamedAction.setActionName(this.actionName)

    return actionExecuteNamedAction
  }

  static fromPB(actionExecuteNamedAction: ActionExecuteNamedAction): NiaActionExecuteNamedAction {
    const niaActionExecuteNamedAction: NiaActionExecuteNamedAction = new NiaActionExecuteNamedAction({
      actionName: actionExecuteNamedAction.getActionName()
    })

    return niaActionExecuteNamedAction
  }

  serialize(): NiaActionExecuteNamedActionSerialized {
    return {
      actionName: this.actionName
    }
  }

  static deserialize(serialized: NiaActionExecuteNamedActionSerialized): NiaActionExecuteNamedAction {
    return new NiaActionExecuteNamedAction(serialized)
  }
}

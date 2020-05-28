import {ActionExecuteNamedAction} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionExecuteNamedActionObject {
  actionName: string
}

export type NiaActionExecuteNamedActionSerialized = NiaActionExecuteNamedActionObject

export class NiaActionExecuteNamedAction implements SerializablePB<NiaActionExecuteNamedAction, ActionExecuteNamedAction>, SerializableObject<NiaActionExecuteNamedAction, NiaActionExecuteNamedActionSerialized> {
  private readonly actionName: string

  constructor(args: NiaActionExecuteNamedActionObject) {
    this.actionName = args.actionName
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteNamedAction
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

import {
  NiaAction,
  NiaActionObject,
  NiaActionSerialized, NiaActionTextType,
  NiaActionType,
  NiaActionUnderlyingType,
  SerializablePB,
} from '@/utils'
import {Action, NamedAction} from 'nia-protocol-js'
import SerializableObject from '@/utils/serializable-object'

export interface NiaNamedActionObject {
  action: NiaAction,
  actionName: string
}

export type NiaNamedActionSerialized = {
  actionSerialized: NiaActionSerialized,
  actionName: string
}


export class NiaNamedAction implements SerializablePB<NiaNamedAction, NamedAction>, SerializableObject<NiaNamedAction, NiaNamedActionSerialized> {
  private readonly action: NiaAction
  private readonly actionName: string

  constructor(args: NiaNamedActionObject) {
    this.action = args.action
    this.actionName = args.actionName
  }
  
  getAction(): NiaAction {
    return this.action
  }
  
  getActionName(): string {
    return this.actionName
  }

  serialize(): NiaNamedActionSerialized {
    return {
      actionSerialized: this.action.serialize(),
      actionName: this.actionName,
    }
  }

  static deserialize(serialized: NiaNamedActionSerialized): NiaNamedAction {
    const args: NiaNamedActionObject = {
      action: NiaAction.deserialize(serialized.actionSerialized),
      actionName: serialized.actionName,
    }

    return new NiaNamedAction(args)
  }

  toPB(): NamedAction {
    const namedActionPB: NamedAction = new NamedAction()

    namedActionPB.setAction(this.action.toPB())
    namedActionPB.setActionName(this.actionName)

    return namedActionPB
  }

  static fromPB(namedActionPB: NamedAction): NiaNamedAction {
    const actionPB: Action | undefined = namedActionPB.getAction()
    const action: NiaAction = actionPB === undefined
      ? new NiaActionTextType({ text: '' }).toAction()
      : NiaAction.fromPB(actionPB)

    const args: NiaNamedActionObject = {
      actionName: namedActionPB.getActionName(),
      action,
    }

    return new NiaNamedAction(args)
  }
}

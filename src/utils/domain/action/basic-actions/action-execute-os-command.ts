import {ActionExecuteOSCommand} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionExecuteOSCommandObject {
  osCommand: string
}

export type NiaActionExecuteOSCommandSerialized = NiaActionExecuteOSCommandObject

export class NiaActionExecuteOSCommand implements
  NiaBasicAction,
  SerializablePB<NiaActionExecuteOSCommand, ActionExecuteOSCommand>,
  SerializableObject<NiaActionExecuteOSCommand, NiaActionExecuteOSCommandSerialized> {
  private readonly osCommand: string

  constructor(args: NiaActionExecuteOSCommandObject) {
    this.osCommand = args.osCommand
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteOSCommand
  }

  getActionTypeName(): string {
    return 'Execute OS command'
  }

  getArgumentCount(): number {
    return 1
  }

  firstArgument(): string {
    return `${this.osCommand}`
  }

  secondArgument(): string {
    return ''
  }

  getOSCommand(): string {
    return this.osCommand
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionExecuteOSCommand {
    const actionExecuteOSCommand: ActionExecuteOSCommand = new ActionExecuteOSCommand()

    actionExecuteOSCommand.setOsCommand(this.osCommand)

    return actionExecuteOSCommand
  }

  static fromPB(actionExecuteOSCommand: ActionExecuteOSCommand): NiaActionExecuteOSCommand {
    const niaActionExecuteOSCommand: NiaActionExecuteOSCommand = new NiaActionExecuteOSCommand({
      osCommand: actionExecuteOSCommand.getOsCommand()
    })

    return niaActionExecuteOSCommand
  }

  serialize(): NiaActionExecuteOSCommandSerialized {
    return {
      osCommand: this.osCommand
    }
  }

  static deserialize(serialized: NiaActionExecuteOSCommandSerialized): NiaActionExecuteOSCommand {
    return new NiaActionExecuteOSCommand(serialized)
  }
}

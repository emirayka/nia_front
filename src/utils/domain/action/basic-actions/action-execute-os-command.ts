import {ActionExecuteOSCommand} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionExecuteOSCommand implements SerializablePB<NiaActionExecuteOSCommand, ActionExecuteOSCommand> {
  private readonly osCommand: string

  constructor(osCommand: string) {
    this.osCommand = osCommand
  }

  getActionType(): NiaActionType {
    return NiaActionType.ExecuteOSCommand
  }

  getOSCommand(): string {
    return this.osCommand
  }

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionExecuteOSCommand {
    const actionExecuteOSCommand: ActionExecuteOSCommand = new ActionExecuteOSCommand()

    actionExecuteOSCommand.setOsCommand(this.osCommand)

    return actionExecuteOSCommand
  }

  static fromPB(actionExecuteOSCommand: ActionExecuteOSCommand): NiaActionExecuteOSCommand {
    const niaActionExecuteOSCommand: NiaActionExecuteOSCommand = new NiaActionExecuteOSCommand(
      actionExecuteOSCommand.getOsCommand()
    )

    return niaActionExecuteOSCommand
  }
}

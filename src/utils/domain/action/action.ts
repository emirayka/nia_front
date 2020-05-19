import {
  NiaActionExecuteCode, NiaActionExecuteCodeSerialized,
  NiaActionExecuteFunction, NiaActionExecuteFunctionSerialized,
  NiaActionExecuteOSCommand, NiaActionExecuteOSCommandSerialized,
  NiaActionKeyClick, NiaActionKeyClickSerialized,
  NiaActionKeyPress, NiaActionKeyPressSerialized,
  NiaActionKeyRelease, NiaActionKeyReleaseSerialized,
  NiaActionMouseAbsoluteMove, NiaActionMouseAbsoluteMoveSerialized,
  NiaActionMouseButtonClick, NiaActionMouseButtonClickSerialized,
  NiaActionMouseButtonPress, NiaActionMouseButtonPressSerialized,
  NiaActionMouseButtonRelease, NiaActionMouseButtonReleaseSerialized,
  NiaActionMouseRelativeMove, NiaActionMouseRelativeMoveSerialized,
  NiaActionTextType, NiaActionTextTypeSerialized,
  NiaActionWait, NiaActionWaitSerialized,
} from './basic-actions'
import {SerializablePB} from '@/utils'
import {
  Action,
  ActionExecuteCode,
  ActionExecuteFunction,
  ActionExecuteOSCommand,
  ActionKeyClick,
  ActionKeyPress,
  ActionKeyRelease,
  ActionMouseAbsoluteMove,
  ActionMouseButtonClick,
  ActionMouseButtonPress,
  ActionMouseButtonRelease,
  ActionMouseRelativeMove,
  ActionTextType,
  ActionWait,
} from 'nia-protocol-js'
import {NiaActionType} from '@/utils/domain/action/action-type'
import ActionCase = Action.ActionCase
import SerializableObject from '@/utils/serializable-object'

export type NiaActionUnderlyingType = NiaActionKeyPress |
  NiaActionKeyClick |
  NiaActionKeyRelease |
  NiaActionMouseButtonPress |
  NiaActionMouseButtonClick |
  NiaActionMouseButtonRelease |
  NiaActionMouseRelativeMove |
  NiaActionMouseAbsoluteMove |
  NiaActionTextType |
  NiaActionWait |
  NiaActionExecuteCode |
  NiaActionExecuteFunction |
  NiaActionExecuteOSCommand

export type NiaActionUnderlyingTypeSerialized = NiaActionExecuteCodeSerialized |
  NiaActionExecuteFunctionSerialized |
  NiaActionExecuteOSCommandSerialized |
  NiaActionKeyClickSerialized |
  NiaActionKeyPressSerialized |
  NiaActionKeyReleaseSerialized |
  NiaActionMouseAbsoluteMoveSerialized |
  NiaActionMouseButtonClickSerialized |
  NiaActionMouseButtonPressSerialized |
  NiaActionMouseButtonReleaseSerialized |
  NiaActionMouseRelativeMoveSerialized |
  NiaActionTextTypeSerialized |
  NiaActionWaitSerialized

export interface NiaActionObject {
  action: NiaActionUnderlyingType,
  actionName: string
}

export type NiaActionSerialized = {
  action: NiaActionUnderlyingTypeSerialized,
  actionType: NiaActionType,
  actionName: string
}

export class NiaAction implements SerializablePB<NiaAction, Action>, SerializableObject<NiaAction, NiaActionSerialized> {
  private readonly actionName: string
  private readonly action: NiaActionUnderlyingType
  private readonly actionType: NiaActionType

  constructor(args: NiaActionObject) {
    this.actionName = args.actionName
    this.action = args.action
    this.actionType = args.action.getActionType()
  }

  getAction(): NiaActionUnderlyingType {
    return this.action
  }

  getActionName(): string {
    return this.actionName
  }

  isKeyPressAction(): boolean {
    return this.actionType === NiaActionType.KeyPress
  }

  isKeyClickAction(): boolean {
    return this.actionType === NiaActionType.KeyClick
  }

  isKeyReleaseAction(): boolean {
    return this.actionType === NiaActionType.KeyRelease
  }

  isMouseButtonPressAction(): boolean {
    return this.actionType === NiaActionType.MouseButtonPress
  }

  isMouseButtonClickAction(): boolean {
    return this.actionType === NiaActionType.MouseButtonClick
  }

  isMouseButtonReleaseAction(): boolean {
    return this.actionType === NiaActionType.MouseButtonRelease
  }

  isMouseRelativeMoveAction(): boolean {
    return this.actionType === NiaActionType.MouseRelativeMove
  }

  isMouseAbsoluteMoveAction(): boolean {
    return this.actionType === NiaActionType.MouseAbsoluteMove
  }

  isTextTypeAction(): boolean {
    return this.actionType === NiaActionType.TextType
  }

  isWaitAction(): boolean {
    return this.actionType === NiaActionType.Wait
  }

  isExecuteCodeAction(): boolean {
    return this.actionType === NiaActionType.ExecuteCode
  }

  isExecuteFunctionAction(): boolean {
    return this.actionType === NiaActionType.ExecuteFunction
  }

  isExecuteOSCommandAction(): boolean {
    return this.actionType === NiaActionType.ExecuteOSCommand
  }

  toPB(): Action {
    let actionPB: Action | null = null

    switch (this.actionType) {
      case NiaActionType.KeyPress:
        const keyPressAction: NiaActionKeyPress = this.action as NiaActionKeyPress
        const keyPressActionPB: ActionKeyPress = keyPressAction.toPB()

        actionPB = new Action()
        actionPB.setActionKeyPress(keyPressActionPB)
        break

      case NiaActionType.KeyClick:
        const keyClickAction: NiaActionKeyClick = this.action as NiaActionKeyClick
        const keyClickActionPB: ActionKeyClick = keyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionKeyClick(keyClickActionPB)
        break

      case NiaActionType.KeyRelease:
        const keyReleaseAction: NiaActionKeyRelease = this.action as NiaActionKeyRelease
        const keyReleaseActionPB: ActionKeyRelease = keyReleaseAction.toPB()

        actionPB = new Action()
        actionPB.setActionKeyRelease(keyReleaseActionPB)
        break

      case NiaActionType.MouseButtonPress:
        const mouseButtonPressAction: NiaActionMouseButtonPress = this.action as NiaActionMouseButtonPress
        const mouseButtonPressActionPB: ActionMouseButtonPress = mouseButtonPressAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonPress(mouseButtonPressActionPB)
        break

      case NiaActionType.MouseButtonClick:
        const mouseButtonClickAction: NiaActionMouseButtonClick = this.action as NiaActionMouseButtonClick
        const mouseButtonClickActionPB: ActionMouseButtonClick = mouseButtonClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonClick(mouseButtonClickActionPB)
        break

      case NiaActionType.MouseButtonRelease:
        const mouseButtonReleaseAction: NiaActionMouseButtonRelease = this.action as NiaActionMouseButtonRelease
        const mouseButtonReleaseActionPB: ActionMouseButtonRelease = mouseButtonReleaseAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonRelease(mouseButtonReleaseActionPB)
        break

      case NiaActionType.MouseRelativeMove:
        const mouseRelativeMoveAction: NiaActionMouseRelativeMove = this.action as NiaActionMouseRelativeMove
        const mouseRelativeMoveActionPB: ActionMouseRelativeMove = mouseRelativeMoveAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseRelativeMove(mouseRelativeMoveActionPB)
        break

      case NiaActionType.MouseAbsoluteMove:
        const mouseAbsoluteAction: NiaActionMouseAbsoluteMove = this.action as NiaActionMouseAbsoluteMove
        const mouseAbsoluteActionPB: ActionMouseAbsoluteMove = mouseAbsoluteAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseAbsoluteMove(mouseAbsoluteActionPB)
        break

      case NiaActionType.TextType:
        const textTypeAction: NiaActionTextType = this.action as NiaActionTextType
        const textTypeActionPB: ActionTextType = textTypeAction.toPB()

        actionPB = new Action()
        actionPB.setActionTextType(textTypeActionPB)
        break

      case NiaActionType.Wait:
        const waitAction: NiaActionWait = this.action as NiaActionWait
        const waitActionPB: ActionWait = waitAction.toPB()

        actionPB = new Action()
        actionPB.setActionWait(waitActionPB)
        break

      case NiaActionType.ExecuteCode:
        const executeCodeAction: NiaActionExecuteCode = this.action as NiaActionExecuteCode
        const executeCodeActionPB: ActionExecuteCode = executeCodeAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteCode(executeCodeActionPB)
        break

      case NiaActionType.ExecuteFunction:
        const executeFunctionAction: NiaActionExecuteFunction = this.action as NiaActionExecuteFunction
        const executeFunctionActionPB: ActionExecuteFunction = executeFunctionAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteFunction(executeFunctionActionPB)
        break

      case NiaActionType.ExecuteOSCommand:
        const executeOSCommandAction: NiaActionExecuteOSCommand = this.action as NiaActionExecuteOSCommand
        const executeOSCommandActionPB: ActionExecuteOSCommand = executeOSCommandAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteOsCommand(executeOSCommandActionPB)
        break
    }

    if (actionPB === null) {
      throw new Error('Unknown Action')
    }

    actionPB.setActionName(this.actionName)

    return actionPB
  }

  static fromPB(actionPB: Action): NiaAction {
    let action: NiaAction | null = null

    const actionName: string = actionPB.getActionName()

    switch (actionPB.getActionCase()) {
      case ActionCase.ACTION_KEY_PRESS:
        const keyPressActionPB: ActionKeyPress | undefined = actionPB.getActionKeyPress()

        if (keyPressActionPB === undefined) {
          throw new Error('KeyPressAction was not set in Action')
        }

        const keyPressAction: NiaActionKeyPress = NiaActionKeyPress.fromPB(keyPressActionPB)

        action = new NiaAction({
          action: keyPressAction,
          actionName,
        })

        break

      case ActionCase.ACTION_KEY_CLICK:
        const keyClickActionPB: ActionKeyClick | undefined = actionPB.getActionKeyClick()

        if (keyClickActionPB === undefined) {
          throw new Error('KeyClickAction was not set in Action')
        }

        const keyClickAction: NiaActionKeyClick = NiaActionKeyClick.fromPB(keyClickActionPB)

        action = new NiaAction({
          action: keyClickAction,
          actionName,
        })

        break

      case ActionCase.ACTION_KEY_RELEASE:
        const keyReleaseActionPB: ActionKeyRelease | undefined = actionPB.getActionKeyRelease()

        if (keyReleaseActionPB === undefined) {
          throw new Error('KeyReleaseAction was not set in Action')
        }

        const keyReleaseAction: NiaActionKeyRelease = NiaActionKeyRelease.fromPB(keyReleaseActionPB)

        action = new NiaAction({
          action: keyReleaseAction,
          actionName,
        })

        break

      case ActionCase.ACTION_MOUSE_BUTTON_PRESS:
        const mouseButtonPressActionPB: ActionMouseButtonPress | undefined = actionPB.getActionMouseButtonPress()

        if (mouseButtonPressActionPB === undefined) {
          throw new Error('MouseButtonPressAction was not set in Action')
        }

        const mouseButtonPressAction: NiaActionMouseButtonPress = NiaActionMouseButtonPress.fromPB(mouseButtonPressActionPB)

        action = new NiaAction({
          action: mouseButtonPressAction,
          actionName,
        })

        break

      case ActionCase.ACTION_MOUSE_BUTTON_CLICK:
        const mouseButtonClickActionPB: ActionMouseButtonClick | undefined = actionPB.getActionMouseButtonClick()

        if (mouseButtonClickActionPB === undefined) {
          throw new Error('MouseButtonClickAction was not set in Action')
        }

        const mouseButtonClickAction: NiaActionMouseButtonClick = NiaActionMouseButtonClick.fromPB(mouseButtonClickActionPB)

        action = new NiaAction({
          action: mouseButtonClickAction,
          actionName,
        })

        break

      case ActionCase.ACTION_MOUSE_BUTTON_RELEASE:
        const mouseButtonReleaseActionPB: ActionMouseButtonRelease | undefined = actionPB.getActionMouseButtonRelease()

        if (mouseButtonReleaseActionPB === undefined) {
          throw new Error('MouseButtonReleaseAction was not set in Action')
        }

        const mouseButtonReleaseAction: NiaActionMouseButtonRelease = NiaActionMouseButtonRelease.fromPB(mouseButtonReleaseActionPB)

        action = new NiaAction({
          action: mouseButtonReleaseAction,
          actionName,
        })

        break

      case ActionCase.ACTION_MOUSE_RELATIVE_MOVE:
        const mouseRelativeMoveActionPB: ActionMouseRelativeMove | undefined = actionPB.getActionMouseRelativeMove()

        if (mouseRelativeMoveActionPB === undefined) {
          throw new Error('MouseRelativeMoveAction was not set in Action')
        }

        const mouseRelativeMoveAction: NiaActionMouseRelativeMove = NiaActionMouseRelativeMove.fromPB(mouseRelativeMoveActionPB)

        action = new NiaAction({
          action: mouseRelativeMoveAction,
          actionName,
        })

        break

      case ActionCase.ACTION_MOUSE_ABSOLUTE_MOVE:
        const mouseAbsoluteMoveActionPB: ActionMouseAbsoluteMove | undefined = actionPB.getActionMouseAbsoluteMove()

        if (mouseAbsoluteMoveActionPB === undefined) {
          throw new Error('MouseAbsoluteMoveAction was not set in Action')
        }

        const mouseAbsoluteMoveAction: NiaActionMouseAbsoluteMove = NiaActionMouseAbsoluteMove.fromPB(mouseAbsoluteMoveActionPB)

        action = new NiaAction({
          action: mouseAbsoluteMoveAction,
          actionName,
        })

        break

      case ActionCase.ACTION_TEXT_TYPE:
        const textTypeActionPB: ActionTextType | undefined = actionPB.getActionTextType()

        if (textTypeActionPB === undefined) {
          throw new Error('TextTypeAction was not set in Action')
        }

        const textTypeAction: NiaActionTextType = NiaActionTextType.fromPB(textTypeActionPB)

        action = new NiaAction({
          action: textTypeAction,
          actionName,
        })

        break

      case ActionCase.ACTION_WAIT:
        const waitActionPB: ActionWait | undefined = actionPB.getActionWait()

        if (waitActionPB === undefined) {
          throw new Error('WaitAction was not set in Action')
        }

        const waitAction: NiaActionWait = NiaActionWait.fromPB(waitActionPB)

        action = new NiaAction({
          action: waitAction,
          actionName,
        })

        break

      case ActionCase.ACTION_EXECUTE_CODE:
        const executeCodeActionPB: ActionExecuteCode | undefined = actionPB.getActionExecuteCode()

        if (executeCodeActionPB === undefined) {
          throw new Error('ExecuteCodeAction was not set in Action')
        }

        const executeCodeAction: NiaActionExecuteCode = NiaActionExecuteCode.fromPB(executeCodeActionPB)

        action = new NiaAction({
          action: executeCodeAction,
          actionName,
        })

        break

      case ActionCase.ACTION_EXECUTE_FUNCTION:
        const executeFunctionActionPB: ActionExecuteFunction | undefined = actionPB.getActionExecuteFunction()

        if (executeFunctionActionPB === undefined) {
          throw new Error('ExecuteFunctionAction was not set in Action')
        }

        const executeFunctionAction: NiaActionExecuteFunction = NiaActionExecuteFunction.fromPB(executeFunctionActionPB)

        action = new NiaAction({
          action: executeFunctionAction,
          actionName,
        })

        break

      case ActionCase.ACTION_EXECUTE_OS_COMMAND:
        const executeOSCommandActionPB: ActionExecuteOSCommand | undefined = actionPB.getActionExecuteOsCommand()

        if (executeOSCommandActionPB === undefined) {
          throw new Error('ExecuteOSCommandAction was not set in Action')
        }

        const executeOSCommandAction: NiaActionExecuteOSCommand = NiaActionExecuteOSCommand.fromPB(executeOSCommandActionPB)

        action = new NiaAction({
          action: executeOSCommandAction,
          actionName,
        })

        break
    }

    if (action === null) {
      throw new Error()
    }

    return action
  }

  serialize(): NiaActionSerialized {
    return {
      action: this.action.serialize(),
      actionName: this.actionName,
      actionType: this.actionType,
    }
  }

  static deserialize(serialized: NiaActionSerialized): NiaAction {
    switch (serialized.actionType) {
      case NiaActionType.ExecuteCode:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionExecuteCode.deserialize(serialized.action as NiaActionExecuteCodeSerialized)
        })

      case NiaActionType.ExecuteFunction:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionExecuteFunction.deserialize(serialized.action as NiaActionExecuteFunctionSerialized)
        })

      case NiaActionType.ExecuteOSCommand:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionExecuteOSCommand.deserialize(serialized.action as NiaActionExecuteOSCommandSerialized)
        })

      case NiaActionType.KeyClick:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionKeyClick.deserialize(serialized.action as NiaActionKeyClickSerialized)
        })

      case NiaActionType.KeyPress:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionKeyPress.deserialize(serialized.action as NiaActionKeyPressSerialized)
        })

      case NiaActionType.KeyRelease:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionKeyRelease.deserialize(serialized.action as NiaActionKeyReleaseSerialized)
        })

      case NiaActionType.MouseAbsoluteMove:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionMouseAbsoluteMove.deserialize(serialized.action as NiaActionMouseAbsoluteMoveSerialized)
        })

      case NiaActionType.MouseButtonClick:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionMouseButtonClick.deserialize(serialized.action as NiaActionMouseButtonClickSerialized)
        })

      case NiaActionType.MouseButtonPress:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionMouseButtonPress.deserialize(serialized.action as NiaActionMouseButtonPressSerialized)
        })

      case NiaActionType.MouseButtonRelease:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionMouseButtonRelease.deserialize(serialized.action as NiaActionMouseButtonReleaseSerialized)
        })

      case NiaActionType.MouseRelativeMove:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionMouseRelativeMove.deserialize(serialized.action as NiaActionMouseRelativeMoveSerialized)
        })

      case NiaActionType.TextType:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionTextType.deserialize(serialized.action as NiaActionTextTypeSerialized)
        })

      case NiaActionType.Wait:
        return new NiaAction({
          actionName: serialized.actionName,
          action: NiaActionWait.deserialize(serialized.action as NiaActionWaitSerialized)
        })

      default:
        throw new Error('Unknown action to deserialize.')
    }
  }
}


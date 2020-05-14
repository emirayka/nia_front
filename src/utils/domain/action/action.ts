import {
  NiaActionExecuteCode,
  NiaActionExecuteFunction,
  NiaActionExecuteOSCommand,
  NiaActionKeyClick,
  NiaActionKeyPress,
  NiaActionKeyRelease,
  NiaActionMouseAbsoluteMove,
  NiaActionMouseButtonClick,
  NiaActionMouseButtonPress,
  NiaActionMouseButtonRelease,
  NiaActionMouseRelativeMove,
  NiaActionTextType,
  NiaActionWait,
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


export class NiaAction implements SerializablePB<NiaAction, Action> {
  private readonly action: NiaActionUnderlyingType
  private readonly actionType: NiaActionType

  constructor(action: NiaActionUnderlyingType) {
    this.action = action
    this.actionType = action.getActionType()
  }

  getAction(): NiaActionUnderlyingType {
    return this.action
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

      case NiaActionType.KeyClick:
        const keyClickAction: NiaActionKeyClick = this.action as NiaActionKeyClick
        const keyClickActionPB: ActionKeyClick = keyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionKeyClick(keyClickActionPB)

      case NiaActionType.KeyRelease:
        const keyReleaseAction: NiaActionKeyRelease = this.action as NiaActionKeyRelease
        const keyReleaseActionPB: ActionKeyRelease = keyReleaseAction.toPB()

        actionPB = new Action()
        actionPB.setActionKeyRelease(keyReleaseActionPB)

      case NiaActionType.MouseButtonPress:
        const mouseButtonPressAction: NiaActionMouseButtonPress = this.action as NiaActionMouseButtonPress
        const mouseButtonPressActionPB: ActionMouseButtonPress = mouseButtonPressAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonPress(mouseButtonPressActionPB)

      case NiaActionType.MouseButtonClick:
        const mouseButtonClickAction: NiaActionMouseButtonClick = this.action as NiaActionMouseButtonClick
        const mouseButtonClickActionPB: ActionMouseButtonClick = mouseButtonClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonClick(mouseButtonClickActionPB)

      case NiaActionType.MouseButtonRelease:
        const mouseButtonReleaseAction: NiaActionMouseButtonRelease = this.action as NiaActionMouseButtonRelease
        const mouseButtonReleaseActionPB: ActionMouseButtonRelease = mouseButtonReleaseAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonRelease(mouseButtonReleaseActionPB)

      case NiaActionType.MouseRelativeMove:
        const mouseRelativeMoveAction: NiaActionMouseRelativeMove = this.action as NiaActionMouseRelativeMove
        const mouseRelativeMoveActionPB: ActionMouseRelativeMove = mouseRelativeMoveAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseRelativeMove(mouseRelativeMoveActionPB)

      case NiaActionType.MouseAbsoluteMove:
        const mouseAbsoluteAction: NiaActionMouseAbsoluteMove = this.action as NiaActionMouseAbsoluteMove
        const mouseAbsoluteActionPB: ActionMouseAbsoluteMove = mouseAbsoluteAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseAbsoluteMove(mouseAbsoluteActionPB)

      case NiaActionType.TextType:
        const textTypeAction: NiaActionTextType = this.action as NiaActionTextType
        const textTypeActionPB: ActionTextType = textTypeAction.toPB()

        actionPB = new Action()
        actionPB.setActionTextType(textTypeActionPB)

      case NiaActionType.Wait:
        const waitAction: NiaActionWait = this.action as NiaActionWait
        const waitActionPB: ActionWait = waitAction.toPB()

        actionPB = new Action()
        actionPB.setActionWait(waitActionPB)

      case NiaActionType.ExecuteCode:
        const executeCodeAction: NiaActionExecuteCode = this.action as NiaActionExecuteCode
        const executeCodeActionPB: ActionExecuteCode = executeCodeAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteCode(executeCodeActionPB)

      case NiaActionType.ExecuteFunction:
        const executeFunctionAction: NiaActionExecuteFunction = this.action as NiaActionExecuteFunction
        const executeFunctionActionPB: ActionExecuteFunction = executeFunctionAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteFunction(executeFunctionActionPB)

      case NiaActionType.ExecuteOSCommand:
        const executeOSCommandAction: NiaActionExecuteOSCommand = this.action as NiaActionExecuteOSCommand
        const executeOSCommandActionPB: ActionExecuteOSCommand = executeOSCommandAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteOsCommand(executeOSCommandActionPB)
    }

    if (actionPB === null) {
      throw new Error('Unknown Action')
    }

    return actionPB
  }

  static fromPB(actionPB: Action): NiaAction {
    let action: NiaAction | null = null

    switch (actionPB.getActionCase()) {
      case ActionCase.ACTION_KEY_PRESS:
        const keyPressActionPB: ActionKeyPress | undefined = actionPB.getActionKeyPress()

        if (keyPressActionPB === undefined) {
          throw new Error('KeyPressAction was not set in Action')
        }

        const keyPressAction: NiaActionKeyPress = NiaActionKeyPress.fromPB(keyPressActionPB)
        action = new NiaAction(keyPressAction)

      case ActionCase.ACTION_KEY_CLICK:
        const keyClickActionPB: ActionKeyClick | undefined = actionPB.getActionKeyClick()

        if (keyClickActionPB === undefined) {
          throw new Error('KeyClickAction was not set in Action')
        }

        const keyClickAction: NiaActionKeyClick = NiaActionKeyClick.fromPB(keyClickActionPB)
        action = new NiaAction(keyClickAction)

      case ActionCase.ACTION_KEY_RELEASE:
        const keyReleaseActionPB: ActionKeyRelease | undefined = actionPB.getActionKeyRelease()

        if (keyReleaseActionPB === undefined) {
          throw new Error('KeyReleaseAction was not set in Action')
        }

        const keyReleaseAction: NiaActionKeyRelease = NiaActionKeyRelease.fromPB(keyReleaseActionPB)
        action = new NiaAction(keyReleaseAction)

      case ActionCase.ACTION_MOUSE_BUTTON_PRESS:
        const mouseButtonPressActionPB: ActionMouseButtonPress | undefined = actionPB.getActionMouseButtonPress()

        if (mouseButtonPressActionPB === undefined) {
          throw new Error('MouseButtonPressAction was not set in Action')
        }

        const mouseButtonPressAction: NiaActionMouseButtonPress = NiaActionMouseButtonPress.fromPB(mouseButtonPressActionPB)
        action = new NiaAction(mouseButtonPressAction)

      case ActionCase.ACTION_MOUSE_BUTTON_CLICK:
        const mouseButtonClickActionPB: ActionMouseButtonClick | undefined = actionPB.getActionMouseButtonClick()

        if (mouseButtonClickActionPB === undefined) {
          throw new Error('MouseButtonClickAction was not set in Action')
        }

        const mouseButtonClickAction: NiaActionMouseButtonClick = NiaActionMouseButtonClick.fromPB(mouseButtonClickActionPB)
        action = new NiaAction(mouseButtonClickAction)

      case ActionCase.ACTION_MOUSE_BUTTON_RELEASE:
        const mouseButtonReleaseActionPB: ActionMouseButtonRelease | undefined = actionPB.getActionMouseButtonRelease()

        if (mouseButtonReleaseActionPB === undefined) {
          throw new Error('MouseButtonReleaseAction was not set in Action')
        }

        const mouseButtonReleaseAction: NiaActionMouseButtonRelease = NiaActionMouseButtonRelease.fromPB(mouseButtonReleaseActionPB)
        action = new NiaAction(mouseButtonReleaseAction)

      case ActionCase.ACTION_MOUSE_RELATIVE_MOVE:
        const mouseRelativeMoveActionPB: ActionMouseRelativeMove | undefined = actionPB.getActionMouseRelativeMove()

        if (mouseRelativeMoveActionPB === undefined) {
          throw new Error('MouseRelativeMoveAction was not set in Action')
        }

        const mouseRelativeMoveAction: NiaActionMouseRelativeMove = NiaActionMouseRelativeMove.fromPB(mouseRelativeMoveActionPB)
        action = new NiaAction(mouseRelativeMoveAction)

      case ActionCase.ACTION_MOUSE_ABSOLUTE_MOVE:
        const mouseAbsoluteMoveActionPB: ActionMouseAbsoluteMove | undefined = actionPB.getActionMouseAbsoluteMove()

        if (mouseAbsoluteMoveActionPB === undefined) {
          throw new Error('MouseAbsoluteMoveAction was not set in Action')
        }

        const mouseAbsoluteMoveAction: NiaActionMouseAbsoluteMove = NiaActionMouseAbsoluteMove.fromPB(mouseAbsoluteMoveActionPB)
        action = new NiaAction(mouseAbsoluteMoveAction)

      case ActionCase.ACTION_TEXT_TYPE:
        const textTypeActionPB: ActionTextType | undefined = actionPB.getActionTextType()

        if (textTypeActionPB === undefined) {
          throw new Error('TextTypeAction was not set in Action')
        }

        const textTypeAction: NiaActionTextType = NiaActionTextType.fromPB(textTypeActionPB)
        action = new NiaAction(textTypeAction)

      case ActionCase.ACTION_WAIT:
        const waitActionPB: ActionWait | undefined = actionPB.getActionWait()

        if (waitActionPB === undefined) {
          throw new Error('WaitAction was not set in Action')
        }

        const waitAction: NiaActionWait = NiaActionWait.fromPB(waitActionPB)
        action = new NiaAction(waitAction)

      case ActionCase.ACTION_EXECUTE_CODE:
        const executeCodeActionPB: ActionExecuteCode | undefined = actionPB.getActionExecuteCode()

        if (executeCodeActionPB === undefined) {
          throw new Error('ExecuteCodeAction was not set in Action')
        }

        const executeCodeAction: NiaActionExecuteCode = NiaActionExecuteCode.fromPB(executeCodeActionPB)
        action = new NiaAction(executeCodeAction)

      case ActionCase.ACTION_EXECUTE_FUNCTION:
        const executeFunctionActionPB: ActionExecuteFunction | undefined = actionPB.getActionExecuteFunction()

        if (executeFunctionActionPB === undefined) {
          throw new Error('ExecuteFunctionAction was not set in Action')
        }

        const executeFunctionAction: NiaActionExecuteFunction = NiaActionExecuteFunction.fromPB(executeFunctionActionPB)
        action = new NiaAction(executeFunctionAction)

      case ActionCase.ACTION_EXECUTE_OS_COMMAND:
        const executeOSCommandActionPB: ActionExecuteOSCommand | undefined = actionPB.getActionExecuteOsCommand()

        if (executeOSCommandActionPB === undefined) {
          throw new Error('ExecuteOSCommandAction was not set in Action')
        }

        const executeOSCommandAction: NiaActionExecuteOSCommand = NiaActionExecuteOSCommand.fromPB(executeOSCommandActionPB)
        action = new NiaAction(executeOSCommandAction)
    }

    if (action === null) {
      throw new Error()
    }

    return action
  }
}
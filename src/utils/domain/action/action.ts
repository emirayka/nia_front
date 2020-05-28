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
  Action, ActionControlKeyClick,
  ActionExecuteCode,
  ActionExecuteFunction, ActionExecuteNamedAction,
  ActionExecuteOSCommand, ActionFunctionKeyClick,
  ActionKeyClick,
  ActionKeyPress,
  ActionKeyRelease, ActionKPKeyClick,
  ActionMouseAbsoluteMove,
  ActionMouseButtonClick, ActionMouseButtonKeyClick,
  ActionMouseButtonPress,
  ActionMouseButtonRelease,
  ActionMouseRelativeMove, ActionMultimediaKeyClick, ActionNumberKeyClick, ActionTextKeyClick,
  ActionTextType,
  ActionWait,
} from 'nia-protocol-js'
import {NiaActionType} from '@/utils/domain/action/action-type'
import ActionCase = Action.ActionCase
import SerializableObject from '@/utils/serializable-object'
import {
  NiaActionTextKeyClick,
  NiaActionTextKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-text-key-click'
import {
  NiaActionNumberKeyClick,
  NiaActionNumberKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-number-key-click'
import {
  NiaActionFunctionKeyClick,
  NiaActionFunctionKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-function-key-click'
import {
  NiaActionControlKeyClick,
  NiaActionControlKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-control-key-click'
import {
  NiaActionKPKeyClick,
  NiaActionKPKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-kp-key-click'
import {
  NiaActionMultimediaKeyClick,
  NiaActionMultimediaKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-multimedia-key-click'
import {
  NiaActionMouseButtonKeyClick,
  NiaActionMouseButtonKeyClickSerialized,
} from '@/utils/domain/action/basic-actions/action-mouse-button-key-click'
import {
  NiaActionExecuteNamedAction,
  NiaActionExecuteNamedActionSerialized,
} from '@/utils/domain/action/basic-actions/action-execute-named-action'

export type NiaActionUnderlyingType =
  NiaActionKeyPress |
  NiaActionKeyClick |
  NiaActionKeyRelease |

  NiaActionMouseButtonPress |
  NiaActionMouseButtonClick |
  NiaActionMouseButtonRelease |

  NiaActionTextKeyClick |
  NiaActionNumberKeyClick |
  NiaActionFunctionKeyClick |
  NiaActionControlKeyClick |
  NiaActionKPKeyClick |
  NiaActionMultimediaKeyClick |
  NiaActionMouseButtonKeyClick |

  NiaActionMouseRelativeMove |
  NiaActionMouseAbsoluteMove |

  NiaActionTextType |
  NiaActionWait |
  NiaActionExecuteCode |
  NiaActionExecuteFunction |
  NiaActionExecuteOSCommand |
  NiaActionExecuteNamedAction

export type NiaActionUnderlyingTypeSerialized =
  NiaActionKeyPressSerialized |
  NiaActionKeyClickSerialized |
  NiaActionKeyReleaseSerialized |

  NiaActionMouseButtonPressSerialized |
  NiaActionMouseButtonClickSerialized |
  NiaActionMouseButtonReleaseSerialized |

  NiaActionTextKeyClickSerialized |
  NiaActionNumberKeyClickSerialized |
  NiaActionFunctionKeyClickSerialized |
  NiaActionControlKeyClickSerialized |
  NiaActionKPKeyClickSerialized |
  NiaActionMultimediaKeyClickSerialized |
  NiaActionMouseButtonKeyClickSerialized |

  NiaActionMouseAbsoluteMoveSerialized |
  NiaActionMouseRelativeMoveSerialized |

  NiaActionWaitSerialized |
  NiaActionTextTypeSerialized |

  NiaActionExecuteFunctionSerialized |
  NiaActionExecuteCodeSerialized |
  NiaActionExecuteOSCommandSerialized |
  NiaActionExecuteNamedActionSerialized

export interface NiaActionObject {
  action: NiaActionUnderlyingType,
}

export type NiaActionSerialized = {
  action: NiaActionUnderlyingTypeSerialized,
  actionType: NiaActionType,
}

export class NiaAction implements SerializablePB<NiaAction, Action>, SerializableObject<NiaAction, NiaActionSerialized> {
  private readonly action: NiaActionUnderlyingType
  private readonly actionType: NiaActionType

  constructor(args: NiaActionObject) {
    this.action = args.action
    this.actionType = args.action.getActionType()
  }

  getAction(): NiaActionUnderlyingType {
    return this.action
  }

  getActionType(): NiaActionType {
    return this.actionType
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

  isExecuteNamedActionAction(): boolean {
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

      case NiaActionType.TextKeyClick:
        const textKeyClickAction: NiaActionTextKeyClick = this.action as NiaActionTextKeyClick
        const textKeyClickActionPB: ActionKeyClick = textKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionTextKeyClick(textKeyClickActionPB)
        break

      case NiaActionType.NumberKeyClick:
        const numberKeyClickAction: NiaActionNumberKeyClick = this.action as NiaActionNumberKeyClick
        const numberKeyClickActionPB: ActionKeyClick = numberKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionNumberKeyClick(numberKeyClickActionPB)
        break

      case NiaActionType.FunctionKeyClick:
        const functionKeyClickAction: NiaActionFunctionKeyClick = this.action as NiaActionFunctionKeyClick
        const functionKeyClickActionPB: ActionKeyClick = functionKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionFunctionKeyClick(functionKeyClickActionPB)
        break

      case NiaActionType.ControlKeyClick:
        const controlKeyClickAction: NiaActionControlKeyClick = this.action as NiaActionControlKeyClick
        const controlKeyClickActionPB: ActionKeyClick = controlKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionControlKeyClick(controlKeyClickActionPB)
        break

      case NiaActionType.KPKeyClick:
        const kpKeyClickAction: NiaActionKPKeyClick = this.action as NiaActionKPKeyClick
        const kpKeyClickActionPB: ActionKeyClick = kpKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionKpKeyClick(kpKeyClickActionPB)
        break

      case NiaActionType.MultimediaKeyClick:
        const multimediaKeyClickAction: NiaActionMultimediaKeyClick = this.action as NiaActionMultimediaKeyClick
        const multimediaKeyClickActionPB: ActionKeyClick = multimediaKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionMultimediaKeyClick(multimediaKeyClickActionPB)
        break

      case NiaActionType.MouseButtonKeyClick:
        const mouseButtonKeyClickAction: NiaActionMouseButtonKeyClick = this.action as NiaActionMouseButtonKeyClick
        const mouseButtonKeyClickActionPB: ActionKeyClick = mouseButtonKeyClickAction.toPB()

        actionPB = new Action()
        actionPB.setActionMouseButtonKeyClick(mouseButtonKeyClickActionPB)
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

      case NiaActionType.ExecuteNamedAction:
        const executeNamedActionAction: NiaActionExecuteNamedAction = this.action as NiaActionExecuteNamedAction
        const executeNamedActionActionPB: ActionExecuteNamedAction = executeNamedActionAction.toPB()

        actionPB = new Action()
        actionPB.setActionExecuteNamedAction(executeNamedActionActionPB)
        break
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

        action = new NiaAction({
          action: keyPressAction,
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
        })

        break

      case ActionCase.ACTION_TEXT_KEY_CLICK:
        const textKeyClickActionPB: ActionTextKeyClick | undefined = actionPB.getActionTextKeyClick()

        if (textKeyClickActionPB === undefined) {
          throw new Error('TextKeyClickAction was not set in Action')
        }

        const textKeyClickAction: NiaActionTextKeyClick = NiaActionTextKeyClick.fromPB(textKeyClickActionPB)

        action = new NiaAction({
          action: textKeyClickAction,
        })

        break

      case ActionCase.ACTION_NUMBER_KEY_CLICK:
        const numberKeyClickActionPB: ActionNumberKeyClick | undefined = actionPB.getActionNumberKeyClick()

        if (numberKeyClickActionPB === undefined) {
          throw new Error('NumberKeyClickAction was not set in Action')
        }

        const numberKeyClickAction: NiaActionNumberKeyClick = NiaActionNumberKeyClick.fromPB(numberKeyClickActionPB)

        action = new NiaAction({
          action: numberKeyClickAction,
        })

        break

      case ActionCase.ACTION_FUNCTION_KEY_CLICK:
        const functionKeyClickActionPB: ActionFunctionKeyClick | undefined = actionPB.getActionFunctionKeyClick()

        if (functionKeyClickActionPB === undefined) {
          throw new Error('KeyClickAction was not set in Action')
        }

        const functionKeyClickAction: NiaActionFunctionKeyClick = NiaActionFunctionKeyClick.fromPB(functionKeyClickActionPB)

        action = new NiaAction({
          action: functionKeyClickAction,
        })

        break

      case ActionCase.ACTION_CONTROL_KEY_CLICK:
        const controlKeyClickActionPB: ActionControlKeyClick | undefined = actionPB.getActionControlKeyClick()

        if (controlKeyClickActionPB === undefined) {
          throw new Error('ControlKeyClickAction was not set in Action')
        }

        const controlKeyClickAction: NiaActionControlKeyClick = NiaActionControlKeyClick.fromPB(controlKeyClickActionPB)

        action = new NiaAction({
          action: controlKeyClickAction,
        })

        break

      case ActionCase.ACTION_KP_KEY_CLICK:
        const kpKeyClickActionPB: ActionKPKeyClick | undefined = actionPB.getActionKpKeyClick()

        if (kpKeyClickActionPB === undefined) {
          throw new Error('KPKeyClickAction was not set in Action')
        }

        const kpKeyClickAction: NiaActionKPKeyClick = NiaActionKPKeyClick.fromPB(kpKeyClickActionPB)

        action = new NiaAction({
          action: kpKeyClickAction,
        })

        break

      case ActionCase.ACTION_MULTIMEDIA_KEY_CLICK:
        const multimediaKeyClickActionPB: ActionMultimediaKeyClick | undefined = actionPB.getActionMultimediaKeyClick()

        if (multimediaKeyClickActionPB === undefined) {
          throw new Error('MultimediaKeyClickAction was not set in Action')
        }

        const multimediaKeyClickAction: NiaActionMultimediaKeyClick = NiaActionMultimediaKeyClick.fromPB(multimediaKeyClickActionPB)

        action = new NiaAction({
          action: multimediaKeyClickAction,
        })

        break

      case ActionCase.ACTION_MOUSE_BUTTON_CLICK:
        const mouseButtonKeyClickActionPB: ActionMouseButtonKeyClick | undefined = actionPB.getActionMouseButtonKeyClick()

        if (mouseButtonKeyClickActionPB === undefined) {
          throw new Error('KeyClickAction was not set in Action')
        }

        const mouseButtonKeyClickAction: NiaActionMouseButtonKeyClick = NiaActionMouseButtonKeyClick.fromPB(mouseButtonKeyClickActionPB)

        action = new NiaAction({
          action: mouseButtonKeyClickAction,
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
        })

        break

      case ActionCase.ACTION_EXECUTE_NAMED_ACTION:
        const executeNamedActionActionPB: ActionExecuteNamedAction | undefined = actionPB.getActionExecuteNamedAction()

        if (executeNamedActionActionPB === undefined) {
          throw new Error('ExecuteNamedActionAction was not set in Action')
        }

        const executeNamedActionAction: NiaActionExecuteNamedAction = NiaActionExecuteNamedAction.fromPB(executeNamedActionActionPB)

        action = new NiaAction({
          action: executeNamedActionAction,
        })

        break
    }

    if (action === null) {
      throw new Error('Action was not deserialized')
    }

    return action
  }

  serialize(): NiaActionSerialized {
    return {
      action: this.action.serialize(),
      actionType: this.actionType,
    }
  }

  static deserialize(serialized: NiaActionSerialized): NiaAction {
    switch (serialized.actionType) {
      case NiaActionType.KeyClick:
        return new NiaAction({
          action: NiaActionKeyClick.deserialize(serialized.action as NiaActionKeyClickSerialized),
        })

      case NiaActionType.KeyPress:
        return new NiaAction({
          action: NiaActionKeyPress.deserialize(serialized.action as NiaActionKeyPressSerialized),
        })

      case NiaActionType.KeyRelease:
        return new NiaAction({
          action: NiaActionKeyRelease.deserialize(serialized.action as NiaActionKeyReleaseSerialized),
        })

      case NiaActionType.MouseButtonClick:
        return new NiaAction({
          action: NiaActionMouseButtonClick.deserialize(serialized.action as NiaActionMouseButtonClickSerialized),
        })

      case NiaActionType.MouseButtonPress:
        return new NiaAction({
          action: NiaActionMouseButtonPress.deserialize(serialized.action as NiaActionMouseButtonPressSerialized),
        })

      case NiaActionType.MouseButtonRelease:
        return new NiaAction({
          action: NiaActionMouseButtonRelease.deserialize(serialized.action as NiaActionMouseButtonReleaseSerialized),
        })

      case NiaActionType.TextKeyClick:
        return new NiaAction({
          action: NiaActionTextKeyClick.deserialize(serialized.action as NiaActionTextKeyClickSerialized),
        })

      case NiaActionType.NumberKeyClick:
        return new NiaAction({
          action: NiaActionNumberKeyClick.deserialize(serialized.action as NiaActionNumberKeyClickSerialized),
        })

      case NiaActionType.FunctionKeyClick:
        return new NiaAction({
          action: NiaActionFunctionKeyClick.deserialize(serialized.action as NiaActionFunctionKeyClickSerialized),
        })

      case NiaActionType.ControlKeyClick:
        return new NiaAction({
          action: NiaActionControlKeyClick.deserialize(serialized.action as NiaActionControlKeyClickSerialized),
        })

      case NiaActionType.KPKeyClick:
        return new NiaAction({
          action: NiaActionKPKeyClick.deserialize(serialized.action as NiaActionKPKeyClickSerialized),
        })

      case NiaActionType.MultimediaKeyClick:
        return new NiaAction({
          action: NiaActionMultimediaKeyClick.deserialize(serialized.action as NiaActionMultimediaKeyClickSerialized),
        })

      case NiaActionType.MouseButtonKeyClick:
        return new NiaAction({
          action: NiaActionMouseButtonKeyClick.deserialize(serialized.action as NiaActionMouseButtonKeyClickSerialized),
        })

      case NiaActionType.MouseAbsoluteMove:
        return new NiaAction({
          action: NiaActionMouseAbsoluteMove.deserialize(serialized.action as NiaActionMouseAbsoluteMoveSerialized),
        })

      case NiaActionType.MouseRelativeMove:
        return new NiaAction({
          action: NiaActionMouseRelativeMove.deserialize(serialized.action as NiaActionMouseRelativeMoveSerialized),
        })

      case NiaActionType.Wait:
        return new NiaAction({
          action: NiaActionWait.deserialize(serialized.action as NiaActionWaitSerialized),
        })
      case NiaActionType.TextType:
        return new NiaAction({
          action: NiaActionTextType.deserialize(serialized.action as NiaActionTextTypeSerialized),
        })

      case NiaActionType.ExecuteCode:
        return new NiaAction({
          action: NiaActionExecuteCode.deserialize(serialized.action as NiaActionExecuteCodeSerialized),
        })

      case NiaActionType.ExecuteFunction:
        return new NiaAction({
          action: NiaActionExecuteFunction.deserialize(serialized.action as NiaActionExecuteFunctionSerialized),
        })

      case NiaActionType.ExecuteOSCommand:
        return new NiaAction({
          action: NiaActionExecuteOSCommand.deserialize(serialized.action as NiaActionExecuteOSCommandSerialized),
        })

      case NiaActionType.ExecuteNamedAction:
        return new NiaAction({
          action: NiaActionExecuteNamedAction.deserialize(serialized.action as NiaActionExecuteNamedActionSerialized),
        })

      default:
        throw new Error('Unknown action to deserialize.')
    }
  }
}


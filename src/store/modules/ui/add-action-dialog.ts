import {defineModule} from "direct-vuex"
import {moduleActionContext, moduleGetterContext} from "@/store"
import {
  NiaAction, NiaActionExecuteCode, NiaActionExecuteFunction, NiaActionExecuteOSCommand,
  NiaActionKeyClick,
  NiaActionKeyPress,
  NiaActionKeyRelease, NiaActionMouseAbsoluteMove,
  NiaActionMouseButtonClick,
  NiaActionMouseButtonPress,
  NiaActionMouseButtonRelease,
  NiaActionMouseRelativeMove, NiaActionTextType,
  NiaActionType,
  NiaActionUnderlyingType, NiaActionWait, NiaNamedAction,
} from '@/utils'

export interface AddActionDialogState {
  isShown: boolean,
  actionName: string,
  actionType: NiaActionType,

  keyCode: number,
  buttonCode: number,
  x: number,
  y: number,
  dx: number,
  dy: number,
  text: string,
  code: string,
  functionName: string,
  osCommand: string,
  waitMSAmount: number,
}

const AddActionDialogModule = defineModule({
  namespaced: true,
  state: (): AddActionDialogState => {
    return {
      isShown: false,

      actionName: '',
      actionType: NiaActionType.KeyClick,

      keyCode: 1,
      buttonCode: 1,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      text: '',
      code: '',
      functionName: '',
      osCommand: '',
      waitMSAmount: 0,
    }
  },
  getters: {
    isShown: (state: AddActionDialogState): boolean => state.isShown,

    selectedActionName: (state: AddActionDialogState): string => state.actionName,
    selectedActionType: (state: AddActionDialogState): NiaActionType => state.actionType,

    // todo: add guards here
    selectedKeyCode: (state: AddActionDialogState): number => state.keyCode,
    selectedButtonCode: (state: AddActionDialogState): number => state.buttonCode,
    selectedX: (state: AddActionDialogState): number => state.x,
    selectedY: (state: AddActionDialogState): number => state.y,
    selectedDX: (state: AddActionDialogState): number => state.dx,
    selectedDY: (state: AddActionDialogState): number => state.dy,
    selectedText: (state: AddActionDialogState): string => state.text,
    selectedCode: (state: AddActionDialogState): string => state.code,
    selectedFunctionName: (state: AddActionDialogState): string => state.functionName,
    selectedOSCommand: (state: AddActionDialogState): string => state.osCommand,
    selectedWaitAmount: (state: AddActionDialogState): number => state.waitMSAmount,

    constructAction: (state: AddActionDialogState) => (): NiaNamedAction => {
      let underlyingAction: NiaActionUnderlyingType | null = null

      switch (state.actionType) {
        case NiaActionType.KeyPress:
          underlyingAction = new NiaActionKeyPress({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.KeyClick:
          underlyingAction = new NiaActionKeyClick({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.KeyRelease:
          underlyingAction = new NiaActionKeyRelease({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.MouseButtonPress:
          underlyingAction = new NiaActionMouseButtonPress({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseButtonClick:
          underlyingAction = new NiaActionMouseButtonClick({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseButtonRelease:
          underlyingAction = new NiaActionMouseButtonRelease({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseRelativeMove:
          underlyingAction = new NiaActionMouseRelativeMove({
            dx: state.dx,
            dy: state.dy,
          })
          break;

        case NiaActionType.MouseAbsoluteMove:
          underlyingAction = new NiaActionMouseAbsoluteMove({
            x: state.x,
            y: state.y,
          })
          break;

        case NiaActionType.TextType:
          underlyingAction = new NiaActionTextType({
            text: state.text
          })
          break;

        case NiaActionType.ExecuteCode:
          underlyingAction = new NiaActionExecuteCode({
            code: state.code
          })
          break;

        case NiaActionType.ExecuteFunction:
          underlyingAction = new NiaActionExecuteFunction({
            functionName: state.functionName
          })
          break;

        case NiaActionType.ExecuteOSCommand:
          underlyingAction = new NiaActionExecuteOSCommand({
            osCommand: state.osCommand
          })
          break;

        case NiaActionType.Wait:
          underlyingAction = new NiaActionWait({
            ms: state.waitMSAmount
          })
          break;
      }

      if (underlyingAction === null) {
        throw new Error('Unknown action to be constructed.')
      }

      const action: NiaAction = new NiaAction({
        action: underlyingAction
      })

      return new NiaNamedAction({
        actionName: state.actionName,
        action: action
      })
    }
  },
  mutations: {
    show: (state: AddActionDialogState) => {
      state.isShown = true
    },
    hide: (state: AddActionDialogState) => {
      state.isShown = false
    },
    setActionName: (state: AddActionDialogState, name: string) => {
      state.actionName = name
    },
    setActionType: (state: AddActionDialogState, actionType: NiaActionType) => {
      state.actionType = actionType
    },

    setKeyCode: (state: AddActionDialogState, keyCode: number) => {
      state.keyCode = keyCode
    },
    setButtonCode: (state: AddActionDialogState, buttonCode: number) => {
      state.buttonCode = buttonCode
    },
    setX: (state: AddActionDialogState, x: number) => {
      state.x = x
    },
    setY: (state: AddActionDialogState, y: number) => {
      state.y = y
    },
    setDX: (state: AddActionDialogState, dx: number) => {
      state.dx = dx
    },
    setDY: (state: AddActionDialogState, dy: number) => {
      state.dy = dy
    },
    setText: (state: AddActionDialogState, text: string) => {
      state.text = text
    },
    setCode: (state: AddActionDialogState, code: string) => {
      state.code = code
    },
    setFunctionName: (state: AddActionDialogState, functionName: string) => {
      state.functionName = functionName
    },
    setOSCommand: (state: AddActionDialogState, OSCommand: string) => {
      state.osCommand = OSCommand
    },
    setWaitMSAmount: (state: AddActionDialogState, waitAmount: number) => {
      state.waitMSAmount = waitAmount
    },
  }
})

export default AddActionDialogModule

const AddActionModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, AddActionDialogModule)
const AddActionModuleActionContext = (context: any) => moduleActionContext(context, AddActionDialogModule)

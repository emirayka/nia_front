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
  NiaActionUnderlyingType, NiaActionWait,
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

    constructAction: (state: AddActionDialogState) => (): NiaAction => {
      let action: NiaActionUnderlyingType | null = null

      switch (state.actionType) {
        case NiaActionType.KeyPress:
          action = new NiaActionKeyPress({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.KeyClick:
          action = new NiaActionKeyClick({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.KeyRelease:
          action = new NiaActionKeyRelease({
            keyCode: state.keyCode
          })
          break;

        case NiaActionType.MouseButtonPress:
          action = new NiaActionMouseButtonPress({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseButtonClick:
          action = new NiaActionMouseButtonClick({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseButtonRelease:
          action = new NiaActionMouseButtonRelease({
            buttonCode: state.buttonCode
          })
          break;

        case NiaActionType.MouseRelativeMove:
          action = new NiaActionMouseRelativeMove({
            dx: state.dx,
            dy: state.dy,
          })
          break;

        case NiaActionType.MouseAbsoluteMove:
          action = new NiaActionMouseAbsoluteMove({
            x: state.x,
            y: state.y,
          })
          break;

        case NiaActionType.TextType:
          action = new NiaActionTextType({
            text: state.text
          })
          break;

        case NiaActionType.ExecuteCode:
          action = new NiaActionExecuteCode({
            code: state.code
          })
          break;

        case NiaActionType.ExecuteFunction:
          action = new NiaActionExecuteFunction({
            functionName: state.functionName
          })
          break;

        case NiaActionType.ExecuteOSCommand:
          action = new NiaActionExecuteOSCommand({
            osCommand: state.osCommand
          })
          break;

        case NiaActionType.Wait:
          action = new NiaActionWait({
            ms: state.waitMSAmount
          })
          break;
      }

      if (action === null) {
        throw new Error('Unknown action to be constructed.')
      }

      return new NiaAction({
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

import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

import {
  GROUP_ALL_KEYS,
  GROUP_ALL_MOUSE_BUTTONS,
  GROUP_CONTROL_KEYS,
  GROUP_FUNCTION_KEYS,
  GROUP_KP_KEYS, GROUP_MOUSE_BUTTON_KEYS,
  GROUP_MULTIMEDIA_KEYS,
  GROUP_NUMBER_KEYS,
  GROUP_TEXT_KEYS,
  mapKeyCodeToIndex,
  mapKeyCodeToString,
  mapMouseButtonCodeToIndex,
  mapStringToKeyCode,
  NiaAction,
  NiaActionExecuteCode, NiaActionExecuteFunction, NiaActionExecuteOSCommand,
  NiaActionKeyClick,
  NiaActionKeyPress,
  NiaActionKeyRelease,
  NiaActionMouseAbsoluteMove,
  NiaActionMouseButtonClick,
  NiaActionMouseButtonPress,
  NiaActionMouseButtonRelease,
  NiaActionMouseRelativeMove,
  NiaActionTextType,
  NiaActionType,
} from '@/utils'

import * as Groups from '@/utils/utils/key-groups'
import {NiaActionKPKeyClick} from '@/utils/domain/action/basic-actions/action-kp-key-click'
import {NiaActionMouseButtonKeyClick} from '@/utils/domain/action/basic-actions/action-mouse-button-key-click'
import {NiaActionControlKeyClick} from '@/utils/domain/action/basic-actions/action-control-key-click'
import {NiaActionMultimediaKeyClick} from '@/utils/domain/action/basic-actions/action-multimedia-key-click'
import {NiaActionFunctionKeyClick} from '@/utils/domain/action/basic-actions/action-function-key-click'
import {NiaActionNumberKeyClick} from '@/utils/domain/action/basic-actions/action-number-key-click'
import {NiaActionTextKeyClick} from '@/utils/domain/action/basic-actions/action-text-key-click'
import {NiaActionExecuteNamedAction} from '@/utils/domain/action/basic-actions/action-execute-named-action'

export enum SelectedActionCategory {
  KeysText,
  KeysNumber,
  KeysFunction,
  KeysMultimedia,
  KeysControl,
  KeysKP,
  KeysMouseButton,

  LowLevelKeyPress,
  LowLevelKeyRelease,
  LowLevelKeyClick,
  LowLevelMouseButtonPress,
  LowLevelMouseButtonRelease,
  LowLevelMouseButtonClick,
  LowLevelMouseAbsoluteMove,
  LowLevelMouseRelativeMove,

  TextType,
  CodeExecute,

  ExecuteFunction,
  ExecuteOSCommand,
  ExecuteNamedAction,
}

export interface SelectedMappingInfoViewState {
  selectedCategory: SelectedActionCategory,

  // keys state
  keysTextIndex: number,
  keysNumberIndex: number,
  keysFunctionIndex: number,
  keysMultimediaIndex: number,
  keysControlIndex: number,
  keysKPIndex: number,
  keysMouseButtonIndex: number,

  // low level state
  lowLevelKeyPressIndex: number,
  lowLevelKeyReleaseIndex: number,
  lowLevelKeyClickIndex: number,
  lowLevelMouseButtonPressIndex: number,
  lowLevelMouseButtonReleaseIndex: number,
  lowLevelMouseButtonClickIndex: number,

  lowLevelMouseAbsoluteMoveX: number,
  lowLevelMouseAbsoluteMoveY: number,
  lowLevelMouseRelativeMoveX: number,
  lowLevelMouseRelativeMoveY: number,

  // text
  textToType: string,

  // code
  codeToExecute: string,

  // misc
  functionNameToExecute: string,
  osCommandToExecute: string,
  actionNameToExecute: string,
}

const defaultState = (): SelectedMappingInfoViewState => ({
  selectedCategory: SelectedActionCategory.KeysText,

  // keys state
  keysTextIndex: 0,
  keysNumberIndex: 0,
  keysFunctionIndex: 0,
  keysMultimediaIndex: 0,
  keysControlIndex: 0,
  keysKPIndex: 0,
  keysMouseButtonIndex: 0,

  // low level state
  lowLevelKeyPressIndex: 0,
  lowLevelKeyReleaseIndex: 0,
  lowLevelKeyClickIndex: 0,
  lowLevelMouseButtonPressIndex: 0,
  lowLevelMouseButtonReleaseIndex: 0,
  lowLevelMouseButtonClickIndex: 0,

  lowLevelMouseAbsoluteMoveX: 0,
  lowLevelMouseAbsoluteMoveY: 0,
  lowLevelMouseRelativeMoveX: 0,
  lowLevelMouseRelativeMoveY: 0,

  // text
  textToType: '',

  // code
  codeToExecute: '',

  // misc
  functionNameToExecute: '',
  osCommandToExecute: '',
  actionNameToExecute: '',
})

const makeSelectedCategorySetter = (value: SelectedActionCategory) => (state: SelectedMappingInfoViewState, _: any) => {
  state.selectedCategory = value
}

const makePropertyIndexSetter = (propertyName: keyof SelectedMappingInfoViewState) =>
  (state: SelectedMappingInfoViewState, index: number) => {
// @ts-ignore
    state[propertyName] = index
  }

const SelectedMappingInfoViewModule = defineModule({
  namespaced: true,
  state: defaultState(),
  getters: {
    selectedCategory: (state: SelectedMappingInfoViewState) => state.selectedCategory,

    // keys
    itemsKeysText: (_: SelectedMappingInfoViewState) => Groups.GROUP_TEXT_KEYS,
    itemsKeysNumber: (_: SelectedMappingInfoViewState) => Groups.GROUP_NUMBER_KEYS,
    itemsKeysFunction: (_: SelectedMappingInfoViewState) => Groups.GROUP_FUNCTION_KEYS,
    itemsKeysMultimedia: (_: SelectedMappingInfoViewState) => Groups.GROUP_MULTIMEDIA_KEYS,
    itemsKeysControl: (_: SelectedMappingInfoViewState) => Groups.GROUP_CONTROL_KEYS,
    itemsKeysKP: (_: SelectedMappingInfoViewState) => Groups.GROUP_KP_KEYS,
    itemsKeysMouseButton: (_: SelectedMappingInfoViewState) => Groups.GROUP_MOUSE_BUTTON_KEYS,

    isActiveKeysText: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysText,
    isActiveKeysNumber: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysNumber,
    isActiveKeysFunction: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysFunction,
    isActiveKeysMultimedia: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysMultimedia,
    isActiveKeysControl: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysControl,
    isActiveKeysKP: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysKP,
    isActiveKeysMouseButton: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.KeysMouseButton,

    keysTextIndex: (state: SelectedMappingInfoViewState) => state.keysTextIndex,
    keysNumberIndex: (state: SelectedMappingInfoViewState) => state.keysNumberIndex,
    keysFunctionIndex: (state: SelectedMappingInfoViewState) => state.keysFunctionIndex,
    keysMultimediaIndex: (state: SelectedMappingInfoViewState) => state.keysMultimediaIndex,
    keysControlIndex: (state: SelectedMappingInfoViewState) => state.keysControlIndex,
    keysKPIndex: (state: SelectedMappingInfoViewState) => state.keysKPIndex,
    keysMouseButtonIndex: (state: SelectedMappingInfoViewState) => state.keysMouseButtonIndex,

    // low level
    itemsLowLevelKeyPress: (_: SelectedMappingInfoViewState) => GROUP_ALL_KEYS,
    itemsLowLevelKeyRelease: (_: SelectedMappingInfoViewState) => GROUP_ALL_KEYS,
    itemsLowLevelKeyClick: (_: SelectedMappingInfoViewState) => GROUP_ALL_KEYS,
    itemsLowLevelMouseButtonPress: (_: SelectedMappingInfoViewState) => GROUP_ALL_MOUSE_BUTTONS,
    itemsLowLevelMouseButtonRelease: (_: SelectedMappingInfoViewState) => GROUP_ALL_MOUSE_BUTTONS,
    itemsLowLevelMouseButtonClick: (_: SelectedMappingInfoViewState) => GROUP_ALL_MOUSE_BUTTONS,

    isActiveLowLevelKeyPress: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.LowLevelKeyPress,
    isActiveLowLevelKeyRelease: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.LowLevelKeyRelease,
    isActiveLowLevelKeyClick: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.LowLevelKeyClick,
    isActiveLowLevelMouseButtonPress: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.LowLevelMouseButtonPress,
    isActiveLowLevelMouseButtonRelease: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.LowLevelMouseButtonRelease,
    isActiveLowLevelMouseButtonClick: (state: SelectedMappingInfoViewState) => state.selectedCategory == SelectedActionCategory.LowLevelMouseButtonClick,
    isActiveLowLevelMouseAbsoluteMove: (state: SelectedMappingInfoViewState) => state.selectedCategory == SelectedActionCategory.LowLevelMouseAbsoluteMove,
    isActiveLowLevelMouseRelativeMove: (state: SelectedMappingInfoViewState) => state.selectedCategory == SelectedActionCategory.LowLevelMouseRelativeMove,

    lowLevelKeyPressIndex: (state: SelectedMappingInfoViewState) => state.lowLevelKeyPressIndex,
    lowLevelKeyReleaseIndex: (state: SelectedMappingInfoViewState) => state.lowLevelKeyReleaseIndex,
    lowLevelKeyClickIndex: (state: SelectedMappingInfoViewState) => state.lowLevelKeyClickIndex,
    lowLevelMouseButtonPressIndex: (state: SelectedMappingInfoViewState) => state.lowLevelMouseButtonPressIndex,
    lowLevelMouseButtonReleaseIndex: (state: SelectedMappingInfoViewState) => state.lowLevelMouseButtonReleaseIndex,
    lowLevelMouseButtonClickIndex: (state: SelectedMappingInfoViewState) => state.lowLevelMouseButtonClickIndex,

    lowLevelMouseAbsoluteMoveX: (state: SelectedMappingInfoViewState) => state.lowLevelMouseAbsoluteMoveX,
    lowLevelMouseAbsoluteMoveY: (state: SelectedMappingInfoViewState) => state.lowLevelMouseAbsoluteMoveY,
    lowLevelMouseRelativeMoveX: (state: SelectedMappingInfoViewState) => state.lowLevelMouseRelativeMoveX,
    lowLevelMouseRelativeMoveY: (state: SelectedMappingInfoViewState) => state.lowLevelMouseRelativeMoveY,

    // text
    isActiveTextType: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.TextType,
    textToType: (state: SelectedMappingInfoViewState) => state.textToType,

    // text
    isActiveCodeExecute: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.CodeExecute,
    codeToExecute: (state: SelectedMappingInfoViewState) => state.codeToExecute,

    // misc
    isActiveExecuteFunction: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.ExecuteFunction,
    functionNameToExecute: (state: SelectedMappingInfoViewState) => state.functionNameToExecute,

    isActiveExecuteOSCommand: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.ExecuteOSCommand,
    osCommandToExecute: (state: SelectedMappingInfoViewState) => state.osCommandToExecute,

    isActiveExecuteNamedAction: (state: SelectedMappingInfoViewState) => state.selectedCategory === SelectedActionCategory.ExecuteNamedAction,
    actionNameToExecute: (state: SelectedMappingInfoViewState) => state.actionNameToExecute,

    // get current action
    getCurrentAction: (...args): NiaAction => {
      const { state, getters } = SelectedMappingInfoViewGetterContext(args)

      switch (state.selectedCategory) {
        case SelectedActionCategory.KeysKP:
          return new NiaActionKPKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysKP[getters.keysKPIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysMouseButton:
          return new NiaActionMouseButtonKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysMouseButton[getters.keysMouseButtonIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysControl:
          return new NiaActionControlKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysControl[getters.keysControlIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysMultimedia:
          return new NiaActionMultimediaKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysMultimedia[getters.keysMultimediaIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysFunction:
          return new NiaActionFunctionKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysFunction[getters.keysFunctionIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysNumber:
          return new NiaActionNumberKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysNumber[getters.keysNumberIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.KeysText:
          return new NiaActionTextKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsKeysText[getters.keysTextIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.CodeExecute:
          return new NiaActionExecuteCode({
            code: getters.codeToExecute,
          }).toAction()

        case SelectedActionCategory.LowLevelKeyClick:
          return new NiaActionKeyClick({
            keyCode: mapStringToKeyCode(getters.itemsLowLevelKeyClick[getters.lowLevelKeyClickIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelKeyPress:
          return new NiaActionKeyPress({
            keyCode: mapStringToKeyCode(getters.itemsLowLevelKeyPress[getters.lowLevelKeyPressIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelKeyRelease:
          return new NiaActionKeyRelease({
            keyCode: mapStringToKeyCode(getters.itemsLowLevelKeyRelease[getters.lowLevelKeyReleaseIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelMouseButtonClick:
          return new NiaActionMouseButtonClick({
            buttonCode: mapStringToKeyCode(getters.itemsLowLevelMouseButtonClick[getters.lowLevelMouseButtonClickIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelMouseButtonPress:
          return new NiaActionMouseButtonPress({
            buttonCode: mapStringToKeyCode(getters.itemsLowLevelMouseButtonPress[getters.lowLevelMouseButtonPressIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelMouseButtonRelease:
          return new NiaActionMouseButtonRelease({
            buttonCode: mapStringToKeyCode(getters.itemsLowLevelMouseButtonRelease[getters.lowLevelMouseButtonReleaseIndex]) ?? 0,
          }).toAction()

        case SelectedActionCategory.LowLevelMouseAbsoluteMove:
          return new NiaActionMouseAbsoluteMove({
            x: getters.lowLevelMouseAbsoluteMoveX,
            y: getters.lowLevelMouseAbsoluteMoveY,
          }).toAction()

        case SelectedActionCategory.LowLevelMouseRelativeMove:
          return new NiaActionMouseRelativeMove({
            dx: getters.lowLevelMouseRelativeMoveX,
            dy: getters.lowLevelMouseRelativeMoveY,
          }).toAction()

        case SelectedActionCategory.TextType:
          return new NiaActionTextType({
            text: getters.textToType,
          }).toAction()

        case SelectedActionCategory.ExecuteFunction:
          return new NiaActionExecuteFunction({
            functionName: getters.functionNameToExecute
          }).toAction()

        case SelectedActionCategory.ExecuteOSCommand:
          return new NiaActionExecuteOSCommand({
            osCommand: getters.osCommandToExecute
          }).toAction()

        case SelectedActionCategory.ExecuteNamedAction:
          return new NiaActionExecuteNamedAction({
            actionName: getters.actionNameToExecute
          }).toAction()

        default:
          throw new Error('Some action were forgotten to implement')
      }
    },
  },
  mutations: {
    setSelectedCategory: (state: SelectedMappingInfoViewState, category: SelectedActionCategory) => {
      state.selectedCategory = category
    },

    // keys
    selectKeysText: makeSelectedCategorySetter(SelectedActionCategory.KeysText),
    selectKeysNumber: makeSelectedCategorySetter(SelectedActionCategory.KeysNumber),
    selectKeysFunction: makeSelectedCategorySetter(SelectedActionCategory.KeysFunction),
    selectKeysMultimedia: makeSelectedCategorySetter(SelectedActionCategory.KeysMultimedia),
    selectKeysControl: makeSelectedCategorySetter(SelectedActionCategory.KeysControl),
    selectKeysKP: makeSelectedCategorySetter(SelectedActionCategory.KeysKP),
    selectKeysMouseButton: makeSelectedCategorySetter(SelectedActionCategory.KeysMouseButton),

    setKeysTextIndex: makePropertyIndexSetter('keysTextIndex'),
    setKeysNumberIndex: makePropertyIndexSetter('keysNumberIndex'),
    setKeysFunctionIndex: makePropertyIndexSetter('keysFunctionIndex'),
    setKeysMultimediaIndex: makePropertyIndexSetter('keysMultimediaIndex'),
    setKeysControlIndex: makePropertyIndexSetter('keysControlIndex'),
    setKeysKPIndex: makePropertyIndexSetter('keysKPIndex'),
    setKeysMouseButtonIndex: makePropertyIndexSetter('keysMouseButtonIndex'),

    // low level
    selectLowLevelKeyPress: makeSelectedCategorySetter(SelectedActionCategory.LowLevelKeyPress),
    selectLowLevelKeyRelease: makeSelectedCategorySetter(SelectedActionCategory.LowLevelKeyRelease),
    selectLowLevelKeyClick: makeSelectedCategorySetter(SelectedActionCategory.LowLevelKeyClick),
    selectLowLevelMouseButtonPress: makeSelectedCategorySetter(SelectedActionCategory.LowLevelMouseButtonPress),
    selectLowLevelMouseButtonRelease: makeSelectedCategorySetter(SelectedActionCategory.LowLevelMouseButtonRelease),
    selectLowLevelMouseButtonClick: makeSelectedCategorySetter(SelectedActionCategory.LowLevelMouseButtonClick),
    selectLowLevelMouseAbsoluteMove: makeSelectedCategorySetter(SelectedActionCategory.LowLevelMouseAbsoluteMove),
    selectLowLevelMouseRelativeMove: makeSelectedCategorySetter(SelectedActionCategory.LowLevelMouseRelativeMove),

    setLowLevelKeyPressIndex: makePropertyIndexSetter('lowLevelKeyPressIndex'),
    setLowLevelKeyReleaseIndex: makePropertyIndexSetter('lowLevelKeyReleaseIndex'),
    setLowLevelKeyClickIndex: makePropertyIndexSetter('lowLevelKeyClickIndex'),
    setLowLevelMouseButtonPressIndex: makePropertyIndexSetter('lowLevelMouseButtonPressIndex'),
    setLowLevelMouseButtonReleaseIndex: makePropertyIndexSetter('lowLevelMouseButtonReleaseIndex'),
    setLowLevelMouseButtonClickIndex: makePropertyIndexSetter('lowLevelMouseButtonClickIndex'),

    setLowLevelMouseAbsoluteMoveX: (state: SelectedMappingInfoViewState, value: number) => state.lowLevelMouseAbsoluteMoveX = value,
    setLowLevelMouseAbsoluteMoveY: (state: SelectedMappingInfoViewState, value: number) => state.lowLevelMouseAbsoluteMoveY = value,
    setLowLevelMouseRelativeMoveX: (state: SelectedMappingInfoViewState, value: number) => state.lowLevelMouseRelativeMoveX = value,
    setLowLevelMouseRelativeMoveY: (state: SelectedMappingInfoViewState, value: number) => state.lowLevelMouseRelativeMoveY = value,

    // text
    selectTextType: makeSelectedCategorySetter(SelectedActionCategory.TextType),
    setTextToType: (state: SelectedMappingInfoViewState, value: string) => state.textToType = value,

    // code
    selectCodeExecute: makeSelectedCategorySetter(SelectedActionCategory.CodeExecute),
    setCodeToExecute: (state: SelectedMappingInfoViewState, value: string) => state.codeToExecute = value,

    // misc
    selectFunctionExecute: makeSelectedCategorySetter(SelectedActionCategory.ExecuteFunction),
    setFunctionNameToExecute: (state: SelectedMappingInfoViewState, value: string) => state.functionNameToExecute = value,

    selectExecuteOSCommand: makeSelectedCategorySetter(SelectedActionCategory.ExecuteOSCommand),
    setOSCommandToExecute: (state: SelectedMappingInfoViewState, value: string) => state.osCommandToExecute = value,

    selectExecuteNamedAction: makeSelectedCategorySetter(SelectedActionCategory.ExecuteNamedAction),
    setActionNameToExecute: (state: SelectedMappingInfoViewState, value: string) => state.actionNameToExecute = value,

    // set current action
    setCurrentAction: (state: SelectedMappingInfoViewState, action: NiaAction) => {
      switch (action.getActionType()) {
        case NiaActionType.TextKeyClick:
          const textKeyClickAction: NiaActionTextKeyClick = (action.getAction() as NiaActionTextKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysText
          state.keysTextIndex = GROUP_TEXT_KEYS.indexOf(mapKeyCodeToString(textKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.NumberKeyClick:
          const numberKeyClickAction: NiaActionNumberKeyClick = (action.getAction() as NiaActionNumberKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysNumber
          state.keysNumberIndex = GROUP_NUMBER_KEYS.indexOf(mapKeyCodeToString(numberKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.FunctionKeyClick:
          const functionKeyClickAction: NiaActionFunctionKeyClick = (action.getAction() as NiaActionFunctionKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysFunction
          state.keysFunctionIndex = GROUP_FUNCTION_KEYS.indexOf(mapKeyCodeToString(functionKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.ControlKeyClick:
          const controlKeyClickAction: NiaActionControlKeyClick = (action.getAction() as NiaActionControlKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysControl
          state.keysControlIndex = GROUP_CONTROL_KEYS.indexOf(mapKeyCodeToString(controlKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.KPKeyClick:
          const kpKeyClickAction: NiaActionKPKeyClick = (action.getAction() as NiaActionKPKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysKP
          state.keysKPIndex = GROUP_KP_KEYS.indexOf(mapKeyCodeToString(kpKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.MultimediaKeyClick:
          const multimediaKeyClickAction: NiaActionMultimediaKeyClick = (action.getAction() as NiaActionMultimediaKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysMultimedia
          state.keysMultimediaIndex = GROUP_MULTIMEDIA_KEYS.indexOf(mapKeyCodeToString(multimediaKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.MouseButtonKeyClick:
          const mouseButtonKeyClickAction: NiaActionMouseButtonKeyClick = (action.getAction() as NiaActionMouseButtonKeyClick)

          state.selectedCategory = SelectedActionCategory.KeysMouseButton
          state.keysMouseButtonIndex = GROUP_MOUSE_BUTTON_KEYS.indexOf(mapKeyCodeToString(mouseButtonKeyClickAction.getKeyCode()) ?? '')
          break

        case NiaActionType.ExecuteCode:
          const executeCodeAction: NiaActionExecuteCode = (action.getAction() as NiaActionExecuteCode)

          state.selectedCategory = SelectedActionCategory.CodeExecute
          state.codeToExecute = executeCodeAction.getCode()
          break

        case NiaActionType.TextType:
          const textTypeAction: NiaActionTextType = (action.getAction() as NiaActionTextType)

          state.selectedCategory = SelectedActionCategory.TextType
          state.textToType = textTypeAction.getText()
          break

        case NiaActionType.MouseAbsoluteMove:
          const mouseAbsoluteMoveAction: NiaActionMouseAbsoluteMove = (action.getAction() as NiaActionMouseAbsoluteMove)

          state.selectedCategory = SelectedActionCategory.LowLevelMouseAbsoluteMove
          state.lowLevelMouseAbsoluteMoveX = mouseAbsoluteMoveAction.getX()
          state.lowLevelMouseAbsoluteMoveY = mouseAbsoluteMoveAction.getY()
          break

        case NiaActionType.MouseRelativeMove:
          const mouseRelativeMoveAction: NiaActionMouseRelativeMove = (action.getAction() as NiaActionMouseRelativeMove)

          state.selectedCategory = SelectedActionCategory.LowLevelMouseRelativeMove
          state.lowLevelMouseRelativeMoveX = mouseRelativeMoveAction.getDx()
          state.lowLevelMouseRelativeMoveY = mouseRelativeMoveAction.getDy()
          break

        case NiaActionType.KeyClick:
          const keyClickAction: NiaActionKeyClick = (action.getAction() as NiaActionKeyClick)

          let indexKeyClick: number = mapKeyCodeToIndex(keyClickAction.getKeyCode()) ?? -1

          if (indexKeyClick === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelKeyClick
          state.lowLevelKeyClickIndex = indexKeyClick

          break

        case NiaActionType.KeyPress:
          const keyPressAction: NiaActionKeyPress = (action.getAction() as NiaActionKeyPress)

          let indexKeyPress: number = mapKeyCodeToIndex(keyPressAction.getKeyCode()) ?? -1

          if (indexKeyPress === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelKeyPress
          state.lowLevelKeyPressIndex = indexKeyPress

          break

        case NiaActionType.KeyRelease:
          const keyReleaseAction: NiaActionKeyRelease = (action.getAction() as NiaActionKeyRelease)

          let indexKeyRelease: number = mapKeyCodeToIndex(keyReleaseAction.getKeyCode()) ?? -1

          if (indexKeyRelease === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelKeyRelease
          state.lowLevelKeyReleaseIndex = indexKeyRelease

          break

        case NiaActionType.MouseButtonClick:
          const mouseButtonClickAction: NiaActionMouseButtonClick = (action.getAction() as NiaActionMouseButtonClick)

          let indexMouseButtonClick: number = mapMouseButtonCodeToIndex(mouseButtonClickAction.getButtonCode()) ?? -1

          if (indexMouseButtonClick === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelMouseButtonClick
          state.lowLevelMouseButtonClickIndex = indexMouseButtonClick

          break

        case NiaActionType.MouseButtonPress:
          const mouseButtonPressAction: NiaActionMouseButtonPress = (action.getAction() as NiaActionMouseButtonPress)

          let indexMouseButtonPress: number = mapMouseButtonCodeToIndex(mouseButtonPressAction.getButtonCode()) ?? -1

          if (indexMouseButtonPress === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelMouseButtonPress
          state.lowLevelMouseButtonPressIndex = indexMouseButtonPress

          break

        case NiaActionType.MouseButtonRelease:
          const mouseButtonReleaseAction: NiaActionMouseButtonRelease = (action.getAction() as NiaActionMouseButtonRelease)

          let indexMouseButtonRelease: number = mapMouseButtonCodeToIndex(mouseButtonReleaseAction.getButtonCode()) ?? -1

          if (indexMouseButtonRelease === -1) {
            return
          }

          state.selectedCategory = SelectedActionCategory.LowLevelMouseButtonRelease
          state.lowLevelMouseButtonReleaseIndex = indexMouseButtonRelease

          break

        case NiaActionType.ExecuteFunction:
          const executeFunctionAction: NiaActionExecuteFunction = (action.getAction() as NiaActionExecuteFunction)
          let functionName: string = executeFunctionAction.getFunctionName()

          state.selectedCategory = SelectedActionCategory.ExecuteFunction
          state.functionNameToExecute = functionName

          break

        case NiaActionType.ExecuteOSCommand:
          const executeOSCommandAction: NiaActionExecuteOSCommand = (action.getAction() as NiaActionExecuteOSCommand)
          const osCommand: string = executeOSCommandAction.getOSCommand()

          state.selectedCategory = SelectedActionCategory.ExecuteOSCommand
          state.osCommandToExecute = osCommand

          break

        case NiaActionType.ExecuteNamedAction:
          const executeNamedAction: NiaActionExecuteNamedAction = (action.getAction() as NiaActionExecuteNamedAction)
          const actionName: string = executeNamedAction.getActionName()

          state.selectedCategory = SelectedActionCategory.ExecuteNamedAction
          state.actionNameToExecute = actionName

          break
      }
    },
  },
})

export default SelectedMappingInfoViewModule

const SelectedMappingInfoViewGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, SelectedMappingInfoViewModule)
const SelectedMappingInfoViewActionContext = (context: any) => moduleActionContext(context, SelectedMappingInfoViewModule)

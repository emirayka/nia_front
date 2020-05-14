import KeyboardKey from '@/store/models/keyboard-key'
import {DeviceInfo} from '@/store/models'
import {Modifier} from '@/store/models/modifier'

export interface UIModuleState {
  selectedKey: KeyboardKey | null,
  selectedModifier: Modifier | null,

  addModifierDialogIsShown: boolean,
  addModifierDialogSelectedKeyboard: string,
  addModifierDialogSelectedKeyCode: number,
  addModifierDialogSelectedModifierAlias: string,
}

export default {
  namespaced: true as true,
  state: {
    selectedKey: null,
    selectedModifier: null,

    addModifierDialogIsShown: false,
    addModifierDialogSelectedKeyboard: '',
    addModifierDialogSelectedKeyCode: -1,
    addModifierDialogSelectedModifierAlias: '',
  } as UIModuleState,
  mutations: {
    selectKey: (state: UIModuleState, keyboardKey: KeyboardKey) => state.selectedKey = keyboardKey,
    unselectKey: (state: UIModuleState) => state.selectedKey = null,

    selectModifier: (state: UIModuleState, modifier: Modifier) => state.selectedModifier = modifier,
    unselectModifier: (state: UIModuleState) => state.selectedModifier = null,

    showAddModifierDialog: (state: UIModuleState) => state.addModifierDialogIsShown = true,
    hideAddModifierDialog: (state: UIModuleState) => state.addModifierDialogIsShown = false,

    setAddModifierDialogSelectedKeyboardName: (state: UIModuleState, name: string) => state.addModifierDialogSelectedKeyboard = name,
    setAddModifierDialogSelectedKeyCode: (state: UIModuleState, code: number) => state.addModifierDialogSelectedKeyCode = code,
    setAddModifierDialogSelectedModifierAlias: (state: UIModuleState, modifierAlias: string) => state.addModifierDialogSelectedModifierAlias = modifierAlias
  },
  getters: {
    getSelectedKey: (state: UIModuleState) => state.selectedKey,
    getSelectedModifier: (state: UIModuleState) => state.selectedModifier,

    addModifierDialogIsShown: (state: UIModuleState) => state.addModifierDialogIsShown,
    addModifierDialogSelectedKeyboard: (state: UIModuleState) => state.addModifierDialogSelectedKeyboard,
    addModifierDialogSelectedKeyCode: (state: UIModuleState) => state.addModifierDialogSelectedKeyCode,
    addModifierDialogSelectedModifierAlias: (state: UIModuleState) => state.addModifierDialogSelectedModifierAlias,
  },
}

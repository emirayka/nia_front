import {NiaAction, NiaKey, NiaModifierDescription} from '@/utils'

export interface UIModuleState {
  selectedKeys: Array<NiaKey>,
  selectedModifiers: Array<NiaModifierDescription>,
  selectedActions: Array<NiaAction>,

  addModifierDialogIsShown: boolean,
  addModifierDialogSelectedKeyboard: string,
  addModifierDialogSelectedKeyCode: number,
  addModifierDialogSelectedModifierAlias: string,

  addActionDialogIsShown: boolean,
  addActionDialogSelectedActionName: string,
}

export default {
  namespaced: true as true,
  state: {
    selectedKeys: [],
    selectedModifiers: [],
    selectedActions: [],

    addModifierDialogIsShown: false,
    addModifierDialogSelectedKeyboard: '',
    addModifierDialogSelectedKeyCode: -1,
    addModifierDialogSelectedModifierAlias: '',

    addActionDialogIsShown: false,
    addActionDialogSelectedActionName: '',
  } as UIModuleState,
  mutations: {
    toggleKeySelection: (state: UIModuleState, key: NiaKey) => {
      for (const selectedKey of state.selectedKeys) {
        if (selectedKey.equals(key)) {
          state.selectedKeys = state.selectedKeys
            .filter((selectedKey) => !selectedKey.equals(key))
          return
        }
      }

      state.selectedKeys.push(key)
    },
    unselectKeys: (state: UIModuleState) => {
      state.selectedKeys = []
    },

    toggleModifierSelection: (state: UIModuleState, modifier: NiaModifierDescription) => {
      for (const selectedModifier of state.selectedModifiers) {
        if (selectedModifier.equals(modifier)) {
          state.selectedModifiers = state.selectedModifiers
            .filter((selectedModifier) => !selectedModifier.equals(modifier))
          return
        }
      }

      state.selectedModifiers.push(modifier)
    },
    unselectModifiers: (state: UIModuleState) => {
      state.selectedModifiers = []
    },

    toggleActionSelection: (state: UIModuleState, action: NiaAction) => {
      for (const selectedAction of state.selectedActions) {
        if (selectedAction.getActionName() === action.getActionName()) {
          state.selectedActions = state.selectedActions
            .filter((selectedAction) => selectedAction.getActionName() !== action.getActionName())
          return
        }
      }

      state.selectedActions.push(action)
    },
    unselectActions: (state: UIModuleState) => {
      state.selectedModifiers = []
    },

    // add modifier dialog
    showAddModifierDialog: (state: UIModuleState) => state.addModifierDialogIsShown = true,
    hideAddModifierDialog: (state: UIModuleState) => state.addModifierDialogIsShown = false,

    setAddModifierDialogSelectedKeyboardName: (state: UIModuleState, name: string) => state.addModifierDialogSelectedKeyboard = name,
    setAddModifierDialogSelectedKeyCode: (state: UIModuleState, code: number) => state.addModifierDialogSelectedKeyCode = code,
    setAddModifierDialogSelectedModifierAlias: (state: UIModuleState, modifierAlias: string) => state.addModifierDialogSelectedModifierAlias = modifierAlias,

    // add action dialog
    showAddActionDialog: (state: UIModuleState) => state.addActionDialogIsShown = true,
    hideAddActionDialog: (state: UIModuleState) => state.addActionDialogIsShown = false,

    setAddActionDialogSelectedActionName: (state: UIModuleState, name: string) => state.addActionDialogSelectedActionName = name,
  },
  getters: {
    getSelectedKeys: (state: UIModuleState) => state.selectedKeys,
    getSelectedModifiers: (state: UIModuleState) => state.selectedModifiers,
    getSelectedActions: (state: UIModuleState) => state.selectedActions,

    // add modifier dialog
    addModifierDialogIsShown: (state: UIModuleState) => state.addModifierDialogIsShown,
    addModifierDialogSelectedKeyboard: (state: UIModuleState) => state.addModifierDialogSelectedKeyboard,
    addModifierDialogSelectedKeyCode: (state: UIModuleState) => state.addModifierDialogSelectedKeyCode,
    addModifierDialogSelectedModifierAlias: (state: UIModuleState) => state.addModifierDialogSelectedModifierAlias,

    // add action dialog
    addActionDialogIsShown: (state: UIModuleState) => state.addActionDialogIsShown,
    addActionDialogSelectedActionName: (state: UIModuleState) => state.addActionDialogSelectedActionName,
  },
}

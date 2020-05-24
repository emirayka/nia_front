import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaKeyChord} from '@/utils'

export interface AddMappingDialogState {
  isShown: boolean,
  selectedKeyChords: Array<NiaKeyChord>,
  valid: boolean
}

const AddMappingDialogModule = defineModule({
  namespaced: true,
  state: {
    isShown: false,
    selectedKeyChords: [],
    valid: false
  } as AddMappingDialogState,
  getters: {
    isShown: (state: AddMappingDialogState) => state.isShown,
    selectedKeyChords: (state: AddMappingDialogState) => state.selectedKeyChords,
    selectedKeyChordsStringRepresentation: (state: AddMappingDialogState): string => {
      return state.selectedKeyChords
        .map((keyChord: NiaKeyChord) => keyChord.stringify())
        .join(' ')
    },
    valid: (state: AddMappingDialogState) => state.valid,
  },
  mutations: {
    show: (state: AddMappingDialogState) => {
      state.isShown = true
    },
    hide: (state: AddMappingDialogState) => {
      state.isShown = false
    },
    setKeyChordsWithString: (state: AddMappingDialogState, keyChordsString: string) => {
      const keyChords: Array<NiaKeyChord | null> = keyChordsString.split(' ')
        .filter((s) => s.length > 0)
        .map((s) => NiaKeyChord.fromString(s))

      const keyChordsParsed: Array<NiaKeyChord> = []

      console.log(keyChordsParsed)

      for (const keyChord of keyChords) {
        if (keyChord === null) {
          state.valid = false
          return
        }

        keyChordsParsed.push(keyChord)
      }

      state.selectedKeyChords = keyChordsParsed
      state.valid = true
    },
    clear: (state: AddMappingDialogState) => {
      state.selectedKeyChords = []
      state.valid = false
    },
  },
})

export default AddMappingDialogModule

const AddMappingModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, AddMappingDialogModule)
const AddMappingModuleActionContext = (context: any) => moduleActionContext(context, AddMappingDialogModule)

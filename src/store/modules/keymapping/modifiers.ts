import Vue from 'vue'
import {NiaKey, NiaModifierDescription} from '@/utils'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

export interface ModifiersModuleState {
  definedModifiers: Array<NiaModifierDescription>,
}

const ModifiersModule = defineModule({
  namespaced: true,
  state: {
    definedModifiers: [],
  } as ModifiersModuleState,
  getters: {
    definedModifiers: (state: ModifiersModuleState) => state.definedModifiers,
    isModifierAlreadyDefined: (state: ModifiersModuleState) => (deviceId: number, keyCode: number) => {
      for (const modifier of state.definedModifiers) {
        if (modifier.getKey().getKeyCode() === keyCode && modifier.getKey().getDeviceId() == deviceId) {
          return true
        }
      }

      return false
    },
    isKeyModifier: (state: ModifiersModuleState) => (key: NiaKey) => {
      for (const modifier of state.definedModifiers) {
        if (modifier.getKey().same(key)) {
          return true
        }
      }

      return false
    }
  },
  mutations: {
    setModifiers(state: ModifiersModuleState, modifiers: Array<NiaModifierDescription>) {
      state.definedModifiers.splice(0)
      state.definedModifiers.push(...modifiers)
    },
    defineModifier: (state: ModifiersModuleState, modifier: NiaModifierDescription) => {
      // todo: show error when modifier is already defined
      state.definedModifiers.push(
        modifier,
      )
    },
    removeModifier: (state: ModifiersModuleState, selectedModifierKey: NiaKey) => {
      state.definedModifiers = state.definedModifiers.filter(
        (modifier) => !modifier.getKey().equals(selectedModifierKey),
      )
    },
  },
})

export default ModifiersModule

const ModifiersModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ModifiersModule)
const ModifiersModuleActionContext = (context: any) => moduleActionContext(context, ModifiersModule)

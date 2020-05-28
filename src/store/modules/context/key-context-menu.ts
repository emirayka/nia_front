import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('store/contexts/key')

import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaKey} from '@/utils'

export interface KeyContextMenuState {
  shown: boolean;
  key: NiaKey | null;
  isSelected: boolean;
  isModifier: boolean;
  x: number;
  y: number;
}

const KeyContextMenuModule = defineModule({
  namespaced: true,
  state: {
    shown: false,
    key: null,
    isSelected: false,
    isModifier: false,
    x: 0,
    y: 0,
  } as KeyContextMenuState,
  mutations: {
    show: (state: KeyContextMenuState) => {
      state.shown = true
    },
    setKey: (state: KeyContextMenuState, key: NiaKey) => {
      state.key = key
    },
    setIsSelected: (state: KeyContextMenuState, isSelected: boolean) => {
      state.isSelected = isSelected
    },
    setIsModifier: (state: KeyContextMenuState, isModifier: boolean) => {
      state.isModifier = isModifier
    },
    setX: (state: KeyContextMenuState, x: number) => {
      state.x = x
    },
    setY: (state: KeyContextMenuState, y: number) => {
      state.y = y
    },
    hide: (state: KeyContextMenuState) => {
      state.shown = false
      state.key = null
      state.isSelected = false
      state.isModifier = false
    },
  },
  getters: {
    shown: (state: KeyContextMenuState) => state.shown,
    key: (state: KeyContextMenuState) => state.key,
    isSelected: (state: KeyContextMenuState) => state.isSelected,
    isModifier: (state: KeyContextMenuState) => state.isModifier,
    x: (state: KeyContextMenuState) => state.x,
    y: (state: KeyContextMenuState) => state.y,
  },
})

export default KeyContextMenuModule

const KeyContextMenuModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, KeyContextMenuModule)
const KeyContextMenuModuleActionContext = (context: any) => moduleActionContext(context, KeyContextMenuModule)

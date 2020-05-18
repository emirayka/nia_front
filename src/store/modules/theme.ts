import {
  Theme
} from '@/store/models'
import {defineModule} from 'direct-vuex'

export interface ThemeModuleState {
  theme: Theme
}

type ThemeMaker = () => Theme;

const defaultTheme: ThemeMaker = () => ({
  bg: '#151515',
  fg: '#FBFCD4',

  bgAccent1: '#0A0A0A',
  fgAccent1: '#FFDD03',

  bgAccent2: '#FBC403',
  fgAccent2: '#0A0A0A',

  bgAccentLight: '#F5EA74',
  fgAccentLight: '#0A0A0A',

  bgWarning1: 'orange',
  fgWarning1: 'black',

  bgWarning2: 'orange',
  fgWarning2: 'black',

  bgError1: 'red',
  fgError1: 'black',

  bgError2: 'red',
  fgError2: 'black',

  bgSuccess1: 'green',
  fgSuccess1: 'black',

  bgSuccess2: 'green',
  fgSuccess2: 'black',
})

const ThemeModule = defineModule({
  namespaced: true as true,
  state: {
    theme: defaultTheme()
  } as ThemeModuleState,
  getters: {
    getBackgroundColor: (state: ThemeModuleState) => state.theme.bg,
    getForegroundColor: (state: ThemeModuleState) => state.theme.fg,

    getBackgroundColorAccent1: (state: ThemeModuleState) => state.theme.bgAccent1,
    getForegroundColorAccent1: (state: ThemeModuleState) => state.theme.fgAccent1,

    getBackgroundColorAccent2: (state: ThemeModuleState) => state.theme.bgAccent2,
    getForegroundColorAccent2: (state: ThemeModuleState) => state.theme.fgAccent2,

    getBackgroundColorAccentLight: (state: ThemeModuleState) => state.theme.bgAccentLight,
    getForegroundColorAccentLight: (state: ThemeModuleState) => state.theme.fgAccentLight,

    getBackgroundColorWarning1: (state: ThemeModuleState) => state.theme.bgWarning1,
    getForegroundColorWarning1: (state: ThemeModuleState) => state.theme.fgWarning1,

    getBackgroundColorWarning2: (state: ThemeModuleState) => state.theme.bgWarning1,
    getForegroundColorWarning2: (state: ThemeModuleState) => state.theme.fgWarning1,

    getBackgroundColorError1: (state: ThemeModuleState) => state.theme.bgError1,
    getForegroundColorError1: (state: ThemeModuleState) => state.theme.fgError1,

    getBackgroundColorError2: (state: ThemeModuleState) => state.theme.bgError2,
    getForegroundColorError2: (state: ThemeModuleState) => state.theme.fgError2,

    getBackgroundColorSuccess1: (state: ThemeModuleState) => state.theme.bgSuccess1,
    getForegroundColorSuccess1: (state: ThemeModuleState) => state.theme.fgSuccess1,

    getBackgroundColorSuccess2: (state: ThemeModuleState) => state.theme.bgSuccess2,
    getForegroundColorSuccess2: (state: ThemeModuleState) => state.theme.fgSuccess2,
  },
})

export default ThemeModule
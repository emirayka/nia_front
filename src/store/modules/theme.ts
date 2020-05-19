import {
  Theme
} from '@/store/models'
import {defineModule} from 'direct-vuex'

export interface ThemeState {
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

const Theme = defineModule({
  namespaced: true as true,
  state: {
    theme: defaultTheme()
  } as ThemeState,
  getters: {
    getBackgroundColor: (state: ThemeState) => state.theme.bg,
    getForegroundColor: (state: ThemeState) => state.theme.fg,

    getBackgroundColorAccent1: (state: ThemeState) => state.theme.bgAccent1,
    getForegroundColorAccent1: (state: ThemeState) => state.theme.fgAccent1,

    getBackgroundColorAccent2: (state: ThemeState) => state.theme.bgAccent2,
    getForegroundColorAccent2: (state: ThemeState) => state.theme.fgAccent2,

    getBackgroundColorAccentLight: (state: ThemeState) => state.theme.bgAccentLight,
    getForegroundColorAccentLight: (state: ThemeState) => state.theme.fgAccentLight,

    getBackgroundColorWarning1: (state: ThemeState) => state.theme.bgWarning1,
    getForegroundColorWarning1: (state: ThemeState) => state.theme.fgWarning1,

    getBackgroundColorWarning2: (state: ThemeState) => state.theme.bgWarning1,
    getForegroundColorWarning2: (state: ThemeState) => state.theme.fgWarning1,

    getBackgroundColorError1: (state: ThemeState) => state.theme.bgError1,
    getForegroundColorError1: (state: ThemeState) => state.theme.fgError1,

    getBackgroundColorError2: (state: ThemeState) => state.theme.bgError2,
    getForegroundColorError2: (state: ThemeState) => state.theme.fgError2,

    getBackgroundColorSuccess1: (state: ThemeState) => state.theme.bgSuccess1,
    getForegroundColorSuccess1: (state: ThemeState) => state.theme.fgSuccess1,

    getBackgroundColorSuccess2: (state: ThemeState) => state.theme.bgSuccess2,
    getForegroundColorSuccess2: (state: ThemeState) => state.theme.fgSuccess2,
  },
})

export default Theme
import Theme from '@/store/models/theme'

export interface ThemeModuleState {
  theme: Theme
}

type ThemeMaker = () => Theme;

const defaultTheme: ThemeMaker = () => ({
  bg: '#151515',
  fg: '#FBFCD4',

  bgAccent1: '#0A0A0A',
  fgAccent1: '#FFDD03',

  bgAccent2: '#0A0A0A',
  fgAccent2: '#FBC403',

  bgWarning: 'orange',
  fgWarning: 'black',

  bgError: 'red',
  fgError: 'black',

  bgSuccess: 'green',
  fgSuccess: 'black',
})

export default {
  namespaced: true as true,
  state: {
    theme: defaultTheme()
  } as ThemeModuleState,
  getters: {
    getBackgroundColor: (state: ThemeModuleState) => state.theme.bg,
  },
}
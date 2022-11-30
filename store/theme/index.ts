import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '../-types'
import { Theme } from '@/types'
import ThemeMutations from './-mutations'
export interface ThemeState {
  dark: Boolean
  themes: {
    dark: Theme
    light: Theme
  }
}

export const state = (): ThemeState => ({
  dark: false,
  themes: {
    dark: {
      primary: '#9C27B0',
      secondary: '#009688',
    },
    light: {
      primary: '#2095F2',
      secondary: '#EE2279',
    },
  },
})

export const mutations: MutationTree<ThemeState> = {
  [ThemeMutations.TOOGLE_DARK_THEME](state) {
    state.dark = !state.dark
  },
}
export const getters: GetterTree<ThemeState, RootState> = {
  getTheme: (state) => state.themes,
}
export const actions: ActionTree<ThemeState, RootState> = {}

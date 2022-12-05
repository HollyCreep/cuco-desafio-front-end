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
      primary: '#2095F2',
      secondary: '#EE2279',
      tertiary: '#12A454',
      error: '#E52E4D',
      heading: '#363F5F',
      body: '#969CB2',
      background: '#F0F2F5',
      warning: {
        base: '#FEEBC8',
        darken1: '#DD6B20',
      },
    },
    light: {
      primary: '#2095F2',
      secondary: '#EE2279',
      tertiary: '#12A454',
      error: '#E52E4D',
      heading: '#363F5F',
      body: '#969CB2',
      background: '#F0F2F5',
      warning: {
        base: '#FEEBC8',
        darken1: '#DD6B20',
      },
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

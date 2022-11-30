import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '../-types'

export interface AccesibilityState {
  showFullScreenMenu: Boolean
  currentFontSize: Number
  defaultFontSize: Number
  grayScale: Boolean
}

export const state = () => ({
  showFullScreenMenu: false,
  currentFontSize: 16,
  defaultFontSize: 16,
  grayScale: false,
})

export const mutations: MutationTree<AccesibilityState> = {
  SHOW_FULLSCREEN_MENU(state, payload) {
    state.showFullScreenMenu = payload
  },
  SET_FONT_SIZE(state, payload) {
    state.currentFontSize = payload
    document.documentElement.style.setProperty('--font-size', `${payload}px`)
  },
  RESET_FONT_SIZE(state) {
    state.currentFontSize = state.defaultFontSize
    document.documentElement.style.setProperty(
      '--font-size',
      `${state.defaultFontSize}px`
    )
  },
  TOOGLE_GRAY_SCALE(state) {
    state.grayScale = !state.grayScale
  },
}
export const getters: GetterTree<AccesibilityState, RootState> = {
  showFullScreenMenu: (state) => state.showFullScreenMenu,
  getFontSize: (state) => state.currentFontSize,
  getGrayScale: (state) => state.grayScale,
}
export const actions: ActionTree<AccesibilityState, RootState> = {}

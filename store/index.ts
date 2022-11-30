import { GetterTree, MutationTree, ActionTree } from 'vuex'
import {
  State,
  Getters,
  MutationsInterface,
  ActionsInterface,
  RootState,
} from './-types'
import { Locales } from '~/types/enums'
import Mutations from './-mutations'

export const state = (): RootState => ({
  locale: Locales.pt,
})

export const getters: GetterTree<State, State> & Getters = {
  locale: (state) => state.locale,
}

export const mutations: MutationTree<State> & MutationsInterface = {
  [Mutations.SET_LOCALE](state, newLocale) {
    state.locale = newLocale
  },
}

export const actions: ActionTree<State, State> & ActionsInterface = {}

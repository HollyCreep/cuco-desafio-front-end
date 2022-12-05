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
import Actions from './-actions'

export const state = (): RootState => ({
  locale: Locales.pt,
  routeFriendlyName: undefined,
  showCreateCustomerButton: false,
})

export const getters: GetterTree<State, State> & Getters = {
  locale: (state) => state.locale,
  routeFriendlyName: (state) => state.routeFriendlyName,
  showCreateCustomerButton: (state) => state.showCreateCustomerButton,
}

export const mutations: MutationTree<State> & MutationsInterface = {
  [Mutations.SET_LOCALE](state, newLocale) {
    state.locale = newLocale
  },
  [Mutations.SET_ROUTE_FRINDLY_NAME](state, name) {
    state.routeFriendlyName = name
  },
  [Mutations.SET_SHOW_CREATE_CUSTOMER_BUTTON](state, payload) {
    state.showCreateCustomerButton = payload
  },
}

export const actions: ActionTree<State, State> & ActionsInterface = {
  async [Actions.SET_ROUTE_CONFIG]({ state, commit }, config) {
    if (
      Object.hasOwnProperty.call(config, 'name') &&
      state.routeFriendlyName !== config.name
    )
      await commit(Mutations.SET_ROUTE_FRINDLY_NAME, config.name)

    if (Object.hasOwnProperty.call(config, 'showButton'))
      await commit(Mutations.SET_SHOW_CREATE_CUSTOMER_BUTTON, config.showButton)
  },
}

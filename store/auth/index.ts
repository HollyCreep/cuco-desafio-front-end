import { GetterTree, MutationTree, ActionTree } from 'vuex'
import AuthMutations from './-mutations'
import { RootState } from '~/store/-types'

export interface AuthState {
  token: string | undefined
}

export const state = (): AuthState => ({
  token: undefined,
})

export const getters: GetterTree<AuthState, RootState> = {
  token: (state) => state.token,
}

export const mutations: MutationTree<AuthState> = {
  [AuthMutations.SET_TOKEN](state, payload) {
    state.token = payload
  },
}

export const actions: ActionTree<AuthState, RootState> = {}

import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import Mutations from './-mutations'
import { ThemeState } from './theme'
import { AuthState } from './auth'
import { AccesibilityState } from './accesibility'
import { Locale } from '~/types'

export interface RootState {
  locale: Locale
}

export interface Getters {
  locale: (state: State) => Locale
}

export interface MutationsInterface {
  [Mutations.SET_LOCALE](s: State, p: Locale): void
}

export enum Actions {}

export interface ActionsInterface {}

export type StoreModules = {
  auth: RootStoreModuleTypes<AuthState>
  accesibility: RootStoreModuleTypes<AccesibilityState>
  theme: RootStoreModuleTypes<ThemeState>
}

export type Store = RootStoreModuleTypes<StoreModules>
export type State = RootState & StoreModules

export type RootStoreModuleTypes<S = RootState> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof MutationsInterface,
    P extends Parameters<MutationsInterface[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<MutationsInterface[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof ActionsInterface>(
    key: K,
    payload?: Parameters<ActionsInterface[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsInterface[K]>
}

import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from 'vuex'
import Mutations from './-mutations'
import { ThemeState } from './theme'
import { AuthState } from './auth'
import { AccesibilityState } from './accesibility'
import { Locale, Page } from '~/types'
import Actions from './-actions'
import { IRouteMetaConfig } from '~/types/interfaces'

export interface RootState {
  loading: Boolean
  locale: Locale
  showCreateCustomerButton: Boolean
  routeFriendlyName?: Page
}

export interface Getters {
  locale: (state: State) => Locale
  loading: (state: State) => Boolean
}

export interface MutationsInterface {
  [Mutations.SET_LOCALE](s: State, p: Locale): void
  [Mutations.SET_LOADING](s: State, p: Boolean): void
  [Mutations.SET_ROUTE_FRINDLY_NAME](s: State, p?: Page): void
  [Mutations.SET_SHOW_CREATE_CUSTOMER_BUTTON](s: State, p: Boolean): void
}

export interface ActionsInterface {
  [Actions.SET_ROUTE_CONFIG](
    context: ActionContext<State, State>,
    p: IRouteMetaConfig
  ): void
}

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

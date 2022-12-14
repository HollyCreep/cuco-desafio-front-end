import AccesibilityMutations from './accesibility/-mutations'
import AuthMutations from './auth/-mutations'
import ThemeMutations from './theme/-mutations'

enum Mutations {
  'SET_LOCALE' = 'SET_LOCALE',
  'SET_ROUTE_FRINDLY_NAME' = 'SET_ROUTE_FRINDLY_NAME',
  'SET_SHOW_CREATE_CUSTOMER_BUTTON' = 'SET_SHOW_CREATE_CUSTOMER_BUTTON',
  'SET_LOADING' = 'SET_LOADING',
  'UNLOCK_FEATURES' = 'UNLOCK_FEATURES',
}

export default {
  ...AuthMutations,
  ...AccesibilityMutations,
  ...ThemeMutations,
  ...Mutations,
}

import AccesibilityMutations from './accesibility/-mutations'
import AuthMutations from './auth/-mutations'
import ThemeMutations from './theme/-mutations'

enum Mutations {
  'SET_LOCALE' = 'SET_LOCALE',
}

export default {
  ...AuthMutations,
  ...AccesibilityMutations,
  ...ThemeMutations,
  ...Mutations,
}

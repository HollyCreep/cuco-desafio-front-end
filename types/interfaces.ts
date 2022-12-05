import { Theme, TranslatorKeys } from '.'

export interface IColor {
  base: string
  lighten1?: string
  lighten2?: string
  lighten3?: string
  darken1?: string
  darken2?: string
  darken3?: string
}

export interface IThemes {
  light: Theme
  dark: Theme
}

export interface IRouteMetaConfig {
  name?: TranslatorKeys
  showButton?: boolean
}

export interface INewCustomer {
  name: string
  cpf: string
  birthdate: string
  phone: string
}

export interface ICustomer extends INewCustomer {
  id: string
}

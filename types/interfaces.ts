import { Theme } from '.'

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

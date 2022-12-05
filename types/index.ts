import { TranslateResult } from 'vue-i18n'
import { Locales } from './enums'
import { IColor } from './interfaces'
import { RecursiveKeyOf, ValueOf } from './utils'
import { Translator } from '~/locales/pt'
import { PAGES } from '~/types/constants/routes'

export type Color = IColor | string

export type Page = ValueOf<typeof PAGES>

export type Theme = Record<string, Color>

export type Locale = keyof Record<Locales, string>

export type TranslatorKeys = RecursiveKeyOf<Translator>

export type TranslatedText<T> = Omit<T, 'text'> & { text: TranslateResult }

export type LocatedText = TranslatorKeys | TranslateResult

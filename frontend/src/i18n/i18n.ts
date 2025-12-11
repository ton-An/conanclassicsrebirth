import { createI18n, type NamedValue } from 'vue-i18n'

import en from './en'
import type { MessageSchema } from './schema'

const i18n = createI18n<[MessageSchema], 'en', false>({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: en,
  },
})

// -------- Type Safety Workaround --------
// (see issue https://github.com/intlify/vue-i18n/issues/1116)
//
//
// ---- Taken from https://github.com/intlify/vue-i18n/blob/v9.9.1/packages/core-base/src/types/utils.ts
type __ResourcePath<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ?
        | `${Key}.${__ResourcePath<T[Key], Exclude<keyof T[Key], keyof unknown[]>> & string}`
        | `${Key}.${Exclude<keyof T[Key], keyof unknown[]> & string}`
    : never
  : never
type _ResourcePath<T> = __ResourcePath<T, keyof T> | keyof T
type ResourcePath<T> = _ResourcePath<T> extends string | keyof T ? _ResourcePath<T> : keyof T

type ResourceValue<T, P extends ResourcePath<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends ResourcePath<T[Key]>
      ? ResourceValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never
// ----

// Currying to simplify the types
export type MessagePath = ResourcePath<MessageSchema>
export type MessageValue<Path extends ResourcePath<MessageSchema>> = ResourceValue<
  MessageSchema,
  Path
>

// Don't forget to `Omit` the properties to replace them completely (no overloading)
type I18nType = typeof i18n
type PatchedI18nType = Omit<I18nType, 'global'> & {
  global: Omit<I18nType['global'], 't' | 'tm'> & {
    t<Path extends MessagePath>(path: Path, named?: NamedValue | string[]): string

    tm<Path extends MessagePath>(path: Path, named?: NamedValue | string[]): MessageValue<Path>
  }
}

export default i18n as PatchedI18nType

import type { Copy } from './types'
import { en } from './en'
import { zh } from './zh'

export type { Copy, FeatureIcon, MultiHubIcon } from './types'

export const locales = [
  { code: 'en', label: en.label },
  { code: 'zh', label: zh.label },
] as const

export type LocaleCode = (typeof locales)[number]['code']

/** English is served unprefixed; Chinese lives under /zh/. */
export const defaultLocale: LocaleCode = 'en'

/** localStorage key holding a language the visitor picked explicitly. */
export const LOCALE_STORAGE_KEY = 'gim-site-lang'

const DICTIONARIES: Record<LocaleCode, Copy> = { en, zh }

export function copyFor(locale: LocaleCode): Copy {
  return DICTIONARIES[locale]
}

/** Where `locale` serves the page at the root-relative `path` (e.g. `download/`). */
export function localePath(locale: LocaleCode, path = ''): string {
  const clean = path.replace(/^\/+/, '')
  return locale === 'zh' ? `/zh/${clean}` : `/${clean}`
}

/** Where each locale serves the page at `path`. */
export function localePaths(path = ''): Record<LocaleCode, string> {
  return { en: localePath('en', path), zh: localePath('zh', path) }
}

/** Where each locale serves the page currently at `pathname`. */
export function localePathsFromUrl(pathname: string): Record<LocaleCode, string> {
  return localePaths(pathname.replace(/^\/zh(?=\/|$)/, ''))
}

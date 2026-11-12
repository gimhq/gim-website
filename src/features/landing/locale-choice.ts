import type { LocaleCode } from '@/shared/i18n'
import { LOCALE_STORAGE_KEY } from '@/shared/i18n'

/** Remembers an explicit pick, so the browser-language redirect leaves it alone. */
export function chooseLocale(next: LocaleCode, paths: Record<LocaleCode, string>) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }
  catch {
    // Storage can be refused; the navigation below still switches the page.
  }
  window.location.href = paths[next]
}

import { afterEach, describe, expect, it, vi } from 'vitest'
import { LOCALE_STORAGE_KEY } from '@/shared/i18n'
import { chooseLocale } from './locale-choice'

describe('chooseLocale', () => {
  afterEach(() => {
    localStorage.clear()
    vi.unstubAllGlobals()
  })

  it('remembers the pick and navigates to that locale', () => {
    const location = { href: '/zh/download/' }
    vi.stubGlobal('location', location)
    chooseLocale('en', { en: '/download/', zh: '/zh/download/' })
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(location.href).toBe('/download/')
  })
})

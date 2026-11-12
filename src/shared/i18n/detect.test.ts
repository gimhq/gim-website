import { describe, expect, it } from 'vitest'
import { zhRedirectTarget } from './detect'

describe('zhRedirectTarget', () => {
  it('sends a browser that prefers Chinese to the /zh/ page', () => {
    expect(zhRedirectTarget('/', null, ['zh-CN', 'en'])).toBe('/zh/')
    expect(zhRedirectTarget('/download/', null, ['zh'])).toBe('/zh/download/')
    expect(zhRedirectTarget('/', null, ['zh-Hant-TW'])).toBe('/zh/')
  })

  it('keeps everyone else on English', () => {
    expect(zhRedirectTarget('/', null, ['en-US', 'zh-CN'])).toBeNull()
    expect(zhRedirectTarget('/', null, ['de'])).toBeNull()
    expect(zhRedirectTarget('/', null, [])).toBeNull()
    expect(zhRedirectTarget('/', null, ['zu'])).toBeNull()
  })

  it('follows an explicit pick over the browser', () => {
    expect(zhRedirectTarget('/', 'en', ['zh-CN'])).toBeNull()
    expect(zhRedirectTarget('/download/', 'zh', ['en-US'])).toBe('/zh/download/')
  })

  it('never redirects a page that is already Chinese', () => {
    expect(zhRedirectTarget('/zh/', null, ['zh-CN'])).toBeNull()
    expect(zhRedirectTarget('/zh', 'zh', ['zh-CN'])).toBeNull()
  })

  it('still works after being serialised into the inline script', () => {
    // eslint-disable-next-line no-new-func
    const revived = new Function(`return (${zhRedirectTarget.toString()})`)() as typeof zhRedirectTarget
    expect(revived('/download/', null, ['zh-CN'])).toBe('/zh/download/')
    expect(revived('/', 'en', ['zh-CN'])).toBeNull()
  })
})

import { describe, expect, it } from 'vitest'
import { en } from './en'
import { localePath, localePaths } from './index'
import { zh } from './zh'

/** Every leaf path of an object, with array lengths, to compare dictionaries. */
function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value))
    return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${prefix}[${i}]`))]
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => shape(v, `${prefix}.${k}`))
  return [prefix]
}

describe('dictionaries', () => {
  it('have the same keys and list lengths in both languages', () => {
    expect(shape(zh)).toEqual(shape(en))
  })

  it('use the same feature icons in the same order', () => {
    expect(zh.features.items.map(i => i.icon)).toEqual(en.features.items.map(i => i.icon))
  })
})

describe('localePath', () => {
  it('serves English unprefixed and Chinese under /zh/', () => {
    expect(localePath('en')).toBe('/')
    expect(localePath('zh')).toBe('/zh/')
    expect(localePaths('/download/')).toEqual({ en: '/download/', zh: '/zh/download/' })
  })
})

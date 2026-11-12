import { describe, expect, it } from 'vitest'
import allowlist from '../../../published-docs.json'
import { DOC_GROUPS, PUBLISHED_DOCS, SLUG_BY_SOURCE } from './published'

describe('the publishing allowlist', () => {
  it('gives every document a unique slug', () => {
    const slugs = PUBLISHED_DOCS.map(doc => doc.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('maps every declared source back to its slug', () => {
    for (const doc of PUBLISHED_DOCS) {
      for (const source of Object.values(doc.sources))
        expect(SLUG_BY_SOURCE.get(source)).toBe(doc.slug)
    }
  })

  it('publishes exactly what the allowlist file names', () => {
    const named = allowlist.groups.flatMap(group => group.docs.map((doc) => {
      const entry = doc as { name: string, dir?: string, slug?: string }
      return entry.slug ?? (entry.dir ? `${entry.dir}/${entry.name}` : entry.name)
    }))
    expect(PUBLISHED_DOCS.map(doc => doc.slug)).toEqual(named)
  })

  it('reads English from docs/ and Chinese from docs/zh/', () => {
    const doc = PUBLISHED_DOCS.find(d => d.slug === 'start/install')
    expect(doc?.sources).toEqual({ en: 'start/install.md', zh: 'zh/start/install.md' })
  })

  it('lists every group the sidebar renders', () => {
    expect(DOC_GROUPS.map(group => group.id)).toEqual(['start', 'servers'])
  })
})

import { describe, expect, it } from 'vitest'
import allowlist from '../../../published-docs.json'
import { DOC_GROUPS, PUBLISHED_DOCS, slugsBySource } from './published'

describe('the publishing allowlist', () => {
  it('gives every document a unique slug', () => {
    const slugs = PUBLISHED_DOCS.map(doc => doc.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('maps every declared source back to its slug', () => {
    for (const doc of PUBLISHED_DOCS) {
      for (const source of Object.values(doc.sources))
        expect(slugsBySource(doc.root).get(source)).toBe(doc.slug)
    }
  })

  it('publishes exactly what the allowlist file names', () => {
    const named = allowlist.groups.flatMap(group => group.docs.map((doc) => {
      const entry = doc as { name: string, dir?: string, slug?: string, repo?: string }
      return entry.slug ?? (entry.repo ? `${entry.repo}/${entry.name}` : entry.dir ? `${entry.dir}/${entry.name}` : entry.name)
    }))
    expect(PUBLISHED_DOCS.map(doc => doc.slug)).toEqual(named)
  })

  it('reads English from docs/ and Chinese from docs/zh/', () => {
    const doc = PUBLISHED_DOCS.find(d => d.slug === 'start/install')
    expect(doc?.sources).toEqual({ en: 'start/install.md', zh: 'zh/start/install.md' })
  })

  it('lists every group the sidebar renders', () => {
    expect(DOC_GROUPS.map(group => group.id)).toEqual(['start', 'servers', 'hub'])
  })

  it('reads a repository document from that repository\'s docs/, in English only', () => {
    const doc = PUBLISHED_DOCS.find(d => d.slug === 'hub/operations')
    expect(doc).toEqual({ slug: 'hub/operations', root: 'gim-hub', sources: { en: 'docs/operations.md' } })
  })

  it('keeps link maps apart per root, so docs/README.md here never matches gim-hub\'s', () => {
    expect(slugsBySource('gim-hub').get('docs/push.md')).toBe('hub/push')
    expect(slugsBySource('local').has('docs/push.md')).toBe(false)
  })
})

import { describe, expect, it, vi } from 'vitest'
import { formatSize } from './format'
import { pickRelease, resolveRelease, SOURCES } from './releases'

function release(tag: string, publishedAt: string | null, assets: string[], extra: object = {}) {
  return {
    tag_name: tag,
    html_url: `https://github.com/gimhq/gim-android/releases/tag/${tag}`,
    draft: false,
    prerelease: true,
    published_at: publishedAt,
    assets: assets.map(name => ({
      name,
      size: 63_580_153,
      browser_download_url: `https://github.com/gimhq/gim-android/releases/download/${tag}/${name}`,
      digest: 'sha256:0719b443',
    })),
    ...extra,
  }
}

const LIST = [
  release('v0.1.0-debug.20261025', '2026-10-25T21:35:04Z', ['a-old.apk']),
  release('v0.1.0-debug.20261112', '2026-11-12T13:10:14Z', ['a-new.apk']),
  release('v0.2.0-draft', null, ['a-draft.apk'], { draft: true }),
]

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

describe('pickRelease', () => {
  it('picks the newest published release, pre-releases included', () => {
    const picked = pickRelease(LIST, SOURCES.android)
    expect(picked).toMatchObject({
      ok: true,
      tag: 'v0.1.0-debug.20261112',
      version: '0.1.0-debug.20261112',
      assetName: 'a-new.apk',
      assetUrl: 'https://github.com/gimhq/gim-android/releases/download/v0.1.0-debug.20261112/a-new.apk',
      sha256: '0719b443',
      releasesUrl: 'https://github.com/gimhq/gim-android/releases',
    })
  })

  it('skips drafts and releases without a matching asset', () => {
    const list = [
      release('v3', '2026-11-20T00:00:00Z', ['notes.txt']),
      release('v2', '2026-11-19T00:00:00Z', ['b.apk'], { draft: true }),
      release('v1', '2026-11-18T00:00:00Z', ['c.apk']),
    ]
    expect(pickRelease(list, SOURCES.android)?.tag).toBe('v1')
    expect(pickRelease(list, SOURCES.macos)).toBeNull()
  })
})

describe('resolveRelease', () => {
  it('asks the release list endpoint, with the token when one is set', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(LIST))
    const resolved = await resolveRelease(SOURCES.android, fetchImpl as unknown as typeof fetch, 'secret')
    expect(resolved.ok).toBe(true)
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/gimhq/gim-android/releases?per_page=20')
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secret')
  })

  it('sends no Authorization header without a token', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(LIST))
    await resolveRelease(SOURCES.android, fetchImpl as unknown as typeof fetch, undefined)
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(init.headers).not.toHaveProperty('Authorization')
  })

  it('falls back to the releases page on an HTTP error, a network error or no asset', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fallback = { ok: false, releasesUrl: 'https://github.com/gimhq/gim-mac/releases' }
    const cases = [
      async () => jsonResponse({ message: 'rate limited' }, 403),
      async () => {
        throw new TypeError('fetch failed')
      },
      async () => jsonResponse(LIST),
    ]
    for (const impl of cases)
      expect(await resolveRelease(SOURCES.macos, impl as unknown as typeof fetch, undefined)).toEqual(fallback)
    expect(warn).toHaveBeenCalledTimes(3)
    warn.mockRestore()
  })
})

describe('formatSize', () => {
  it('shows megabytes with one decimal', () => {
    expect(formatSize(63_580_153)).toBe('60.6 MB')
  })
})

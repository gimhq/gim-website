import type { Release } from './releases'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { copyFor } from '@/shared/i18n'
import { DownloadSection } from './components/download-section'

const android: Release = {
  ok: true,
  tag: 'v0.1.0-debug.20261112',
  version: '0.1.0-debug.20261112',
  publishedAt: '2026-11-12T13:10:14Z',
  assetName: 'gim-android-0.1.0-debug-7de3af4.apk',
  assetUrl: 'https://github.com/gimhq/gim-android/releases/download/v0.1.0-debug.20261112/gim-android-0.1.0-debug-7de3af4.apk',
  assetSize: 63_580_153,
  sha256: '0719b44302ef7e6210dd72fb5056bd1826bd81ea9fc56b3f1b02febf193ac8b0',
  releaseUrl: 'https://github.com/gimhq/gim-android/releases/tag/v0.1.0-debug.20261112',
  releasesUrl: 'https://github.com/gimhq/gim-android/releases',
}
const macos: Release = { ok: false, releasesUrl: 'https://github.com/gimhq/gim-mac/releases' }

describe('download section', () => {
  it('links a resolved release asset with its version and date', () => {
    render(<DownloadSection copy={copyFor('en')} releases={{ android, macos }} />)
    const link = screen.getAllByRole('link', { name: 'Download' })[0]
    expect(link).toHaveAttribute('href', android.assetUrl)
    expect(screen.getByText('0.1.0-debug.20261112')).toHaveAttribute('href', android.releaseUrl)
    expect(screen.getByText('Nov 12, 2026')).toBeInTheDocument()
    expect(screen.getByText(android.sha256!)).toBeInTheDocument()
  })

  it('falls back to the releases page when a release could not be resolved', () => {
    render(<DownloadSection copy={copyFor('en')} releases={{ android, macos }} />)
    expect(screen.getByText(/could not be looked up/)).toBeInTheDocument()
    const releaseLinks = screen.getAllByRole('link', { name: 'All releases' }).map(a => a.getAttribute('href'))
    expect(releaseLinks).toContain(macos.releasesUrl)
  })

  it('marks iOS and Windows as coming soon, in Chinese too', () => {
    render(<DownloadSection copy={copyFor('zh')} releases={{ android, macos }} />)
    expect(screen.getAllByText('即将推出')).toHaveLength(2)
    expect(screen.getByText('2026年11月12日')).toBeInTheDocument()
  })
})

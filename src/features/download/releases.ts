import process from 'node:process'

/**
 * Resolves the newest release of each client repository at build time.
 *
 * The client builds are pre-releases, which GitHub's /releases/latest skips,
 * so this reads the release list (pre-releases included) and picks the newest
 * published one that carries a matching asset. Any failure falls back to the
 * repository's releases page.
 */

export interface ReleaseSource {
  /** `owner/name` on GitHub. */
  repo: string
  /** Matches the asset to link, e.g. `.apk`. */
  asset: RegExp
}

export interface ResolvedRelease {
  ok: true
  tag: string
  version: string
  publishedAt: string
  assetName: string
  assetUrl: string
  assetSize: number
  sha256: string | null
  releaseUrl: string
  releasesUrl: string
}

export interface FallbackRelease {
  ok: false
  releasesUrl: string
}

export type Release = ResolvedRelease | FallbackRelease

interface ApiAsset {
  name: string
  size: number
  browser_download_url: string
  digest?: string | null
}

interface ApiRelease {
  tag_name: string
  html_url: string
  draft: boolean
  published_at: string | null
  assets: ApiAsset[]
}

export const SOURCES = {
  android: { repo: 'gimhq/gim-android', asset: /\.apk$/i },
  macos: { repo: 'gimhq/gim-mac', asset: /\.zip$/i },
} satisfies Record<string, ReleaseSource>

export type ReleasePlatform = keyof typeof SOURCES

export function releasesUrl(repo: string): string {
  return `https://github.com/${repo}/releases`
}

/** Picks the newest published release with a matching asset, or null. */
export function pickRelease(releases: ApiRelease[], source: ReleaseSource): ResolvedRelease | null {
  const candidates = releases
    .filter(r => !r.draft && r.published_at)
    .sort((a, b) => Date.parse(b.published_at!) - Date.parse(a.published_at!))
  for (const release of candidates) {
    const asset = release.assets.find(a => source.asset.test(a.name))
    if (!asset)
      continue
    const digest = asset.digest?.startsWith('sha256:') ? asset.digest.slice(7) : null
    return {
      ok: true,
      tag: release.tag_name,
      version: release.tag_name.replace(/^v/, ''),
      publishedAt: release.published_at!,
      assetName: asset.name,
      assetUrl: asset.browser_download_url,
      assetSize: asset.size,
      sha256: digest,
      releaseUrl: release.html_url,
      releasesUrl: releasesUrl(source.repo),
    }
  }
  return null
}

export async function resolveRelease(
  source: ReleaseSource,
  fetchImpl: typeof fetch = fetch,
  token: string | undefined = process.env.GITHUB_TOKEN,
): Promise<Release> {
  const fallback: FallbackRelease = { ok: false, releasesUrl: releasesUrl(source.repo) }
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'gim-website-build',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token)
    headers.Authorization = `Bearer ${token}`
  try {
    const response = await fetchImpl(
      `https://api.github.com/repos/${source.repo}/releases?per_page=20`,
      { headers, signal: AbortSignal.timeout(15_000) },
    )
    if (!response.ok) {
      console.warn(`[releases] ${source.repo}: HTTP ${response.status}, linking the releases page`)
      return fallback
    }
    const picked = pickRelease(await response.json() as ApiRelease[], source)
    if (!picked)
      console.warn(`[releases] ${source.repo}: no release with a matching asset, linking the releases page`)
    return picked ?? fallback
  }
  catch (error) {
    console.warn(`[releases] ${source.repo}: ${(error as Error).message}, linking the releases page`)
    return fallback
  }
}

let cached: Promise<Record<ReleasePlatform, Release>> | undefined

/** Every client release, fetched once per build and shared by all pages. */
export function loadReleases(): Promise<Record<ReleasePlatform, Release>> {
  cached ??= (async () => {
    const [android, macos] = await Promise.all([
      resolveRelease(SOURCES.android),
      resolveRelease(SOURCES.macos),
    ])
    return { android, macos }
  })()
  return cached
}

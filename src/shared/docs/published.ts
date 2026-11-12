import type { LocaleCode } from '@/shared/i18n'
import allowlist from '../../../published-docs.json'

/**
 * The allowlist of documents this website publishes, read from
 * `published-docs.json`. A file is published by appearing there, never by
 * existing under `docs/` or in an upstream repository.
 */

/** Where a document comes from: this repository's `docs/`, or a gimhq repository. */
export type DocRoot = 'local' | UpstreamRepo

/** gimhq repositories whose own docs the site republishes, fetched at build time. */
export const UPSTREAM_REPOS = ['gim-hub'] as const
export type UpstreamRepo = (typeof UPSTREAM_REPOS)[number]

export interface PublishedDoc {
  /** Path under `/docs/`, without extension. */
  slug: string
  root: DocRoot
  /**
   * Source path per locale: relative to `docs/` for local documents, relative
   * to the repository root for upstream ones.
   */
  sources: Partial<Record<LocaleCode, string>>
}

export type GroupId = 'start' | 'servers' | 'hub'

export interface DocGroup {
  /** Key into `Copy['docs']['groups']` for the heading. */
  id: GroupId
  docs: PublishedDoc[]
}

/** One entry of the allowlist file. */
interface AllowlistDoc {
  name: string
  /** The directory under the documentation root; the root itself when the entry omits it. */
  dir?: string
  /** The site slug, when it should not be `<dir>/<name>`. */
  slug?: string
  locales?: readonly string[]
  /** A gimhq repository to read `docs/<name>.md` from, instead of this repository's `docs/`. */
  repo?: UpstreamRepo
}

/**
 * Resolves one entry to its sources. Local English is `<dir>/<name>.md` and
 * Chinese `zh/<dir>/<name>.md`; an upstream document is `docs/<name>.md` in its
 * repository, which has English only.
 */
function sourceDoc(entry: AllowlistDoc): PublishedDoc {
  const { name, dir, repo } = entry
  const path = dir ? `${dir}/${name}` : name
  if (repo) {
    return { slug: entry.slug ?? `${repo}/${name}`, root: repo, sources: { en: `docs/${name}.md` } }
  }
  const locales = entry.locales ?? ['zh', 'en']
  const sources: Partial<Record<LocaleCode, string>> = {}
  if (locales.includes('en'))
    sources.en = `${path}.md`
  if (locales.includes('zh'))
    sources.zh = `zh/${path}.md`
  return { slug: entry.slug ?? path, root: 'local', sources }
}

export const DOC_GROUPS: DocGroup[] = allowlist.groups.map(group => ({
  id: group.id as GroupId,
  docs: group.docs.map(doc => sourceDoc(doc as AllowlistDoc)),
}))

export const PUBLISHED_DOCS: PublishedDoc[] = DOC_GROUPS.flatMap(group => group.docs)

/** Source path -> site slug within one root, for rewriting links between documents. */
export function slugsBySource(root: DocRoot): ReadonlyMap<string, string> {
  return new Map(
    PUBLISHED_DOCS
      .filter(doc => doc.root === root)
      .flatMap(doc => Object.values(doc.sources).map(source => [source, doc.slug] as const)),
  )
}

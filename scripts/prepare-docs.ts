import type { DocRoot, UpstreamRepo } from '../src/shared/docs/published'
import type { LocaleCode } from '../src/shared/i18n'
/**
 * Copies the allowlisted documentation into `src/content/docs/` for Starlight,
 * lifting each H1 into frontmatter and rewriting links on the way.
 *
 * Two kinds of source: this repository's `docs/`, and the `docs/` of gimhq
 * repositories (gim-hub), fetched from GitHub on every run so the site carries
 * the same text as the repository. Upstream is read-only; the transformations
 * are unit-tested in `shared/docs/transform.ts`.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { PUBLISHED_DOCS, slugsBySource, UPSTREAM_REPOS } from '../src/shared/docs/published'
import { frontmatter, rewriteLinks, sourceNote, takeTitle } from '../src/shared/docs/transform'
import { locales } from '../src/shared/i18n'

const OUT_ROOT = resolve('src/content/docs')
const CACHE = resolve('.cache/upstream')

interface Root {
  dir: string
  /** Every file and directory (with a trailing slash) under `dir`. */
  paths: Set<string>
  blobBase: string
  /** Set for an upstream repository. */
  upstream?: { repo: UpstreamRepo, commit: string }
}

function outputPath(locale: LocaleCode, slug: string): string {
  return locale === 'en'
    ? join(OUT_ROOT, 'docs', `${slug}.md`)
    : join(OUT_ROOT, locale, 'docs', `${slug}.md`)
}

async function listPaths(dir: string, base = dir): Promise<Set<string>> {
  const found = new Set<string>()
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      found.add(`${relative(base, full)}/`)
      for (const nested of await listPaths(full, base)) found.add(nested)
    }
    else {
      found.add(relative(base, full))
    }
  }
  return found
}

function git(...args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim()
}

/** Every path in a repository's tree, files and directories, without reading the blobs. */
function treePaths(dir: string): Set<string> {
  const paths = new Set<string>()
  for (const file of git('-C', dir, 'ls-tree', '-r', '--name-only', 'HEAD').split('\n')) {
    paths.add(file)
    const parts = file.split('/')
    for (let i = 1; i < parts.length; i++) paths.add(`${parts.slice(0, i).join('/')}/`)
  }
  return paths
}

/**
 * The repository's default branch from GitHub: a shallow, blobless clone with
 * only docs/ checked out, refreshed on every run. `GIM_<REPO>_ROOT` (e.g.
 * GIM_HUB_ROOT for gim-hub) points at a local checkout instead.
 */
function upstreamRoot(repo: UpstreamRepo): Root {
  const override = process.env[`GIM_${repo.replace(/^gim-/, '').toUpperCase()}_ROOT`]
  let dir: string
  if (override) {
    dir = resolve(override)
  }
  else {
    dir = join(CACHE, repo)
    const url = `https://github.com/gimhq/${repo}.git`
    if (existsSync(join(dir, '.git'))) {
      git('-C', dir, 'fetch', '--quiet', '--depth', '1', 'origin', 'HEAD')
      git('-C', dir, 'checkout', '--quiet', '--force', 'FETCH_HEAD')
    }
    else {
      git('clone', '--quiet', '--depth', '1', '--filter=blob:none', '--sparse', url, dir)
      git('-C', dir, 'sparse-checkout', 'set', 'docs')
    }
  }
  const commit = git('-C', dir, 'rev-parse', 'HEAD')
  return {
    dir,
    paths: treePaths(dir),
    blobBase: `https://github.com/gimhq/${repo}/blob/${commit}`,
    upstream: { repo, commit },
  }
}

async function main(): Promise<void> {
  const localDir = resolve(process.env.GIM_DOCS_ROOT ?? 'docs')
  if (!existsSync(localDir)) {
    console.error(`documentation not found at ${localDir}\nset GIM_DOCS_ROOT to point at it`)
    process.exit(1)
  }
  const roots = new Map<DocRoot, Root>([['local', {
    dir: localDir,
    paths: await listPaths(localDir),
    blobBase: 'https://github.com/gimhq/gim-website/blob/main/docs',
  }]])
  for (const repo of UPSTREAM_REPOS) {
    if (PUBLISHED_DOCS.some(doc => doc.root === repo))
      roots.set(repo, upstreamRoot(repo))
  }

  const problems: string[] = []
  let written = 0
  let internal = 0
  let external = 0

  await rm(OUT_ROOT, { recursive: true, force: true })

  for (const doc of PUBLISHED_DOCS) {
    const root = roots.get(doc.root)!
    for (const { code: locale } of locales) {
      const source = doc.sources[locale]
      if (!source)
        continue

      if (!root.paths.has(source)) {
        problems.push(`${doc.slug}: allowlisted source is missing in ${doc.root}: ${source}`)
        continue
      }

      const raw = await readFile(join(root.dir, source), 'utf8')
      let title: string
      let body: string
      try {
        ({ title, body } = takeTitle(raw))
      }
      catch (error) {
        problems.push(`${doc.root}:${source}: ${(error as Error).message}`)
        continue
      }

      const result = rewriteLinks(body, {
        sourcePath: source,
        locale,
        slugBySource: slugsBySource(doc.root),
        upstreamPaths: root.paths,
        blobBase: root.blobBase,
      })
      problems.push(...result.problems.map(problem => `${doc.root}: ${problem}`))
      internal += result.internal
      external += result.external

      const note = root.upstream ? sourceNote(root.upstream.repo, source, root.upstream.commit) : ''
      const destination = outputPath(locale, doc.slug)
      await mkdir(dirname(destination), { recursive: true })
      await writeFile(destination, frontmatter(title) + note + result.body.trimStart())
      written += 1
    }
  }

  const upstream = [...roots.values()]
    .flatMap(root => root.upstream ? [`gimhq/${root.upstream.repo}@${root.upstream.commit.slice(0, 7)}`] : [])
  console.log(
    `prepared ${written} document(s) from ${localDir}${upstream.length ? ` and ${upstream.join(', ')}` : ''}\n`
    + `  ${internal} link(s) kept on the site, ${external} sent to the repositories`,
  )

  if (problems.length > 0) {
    console.error(`\n${problems.length} problem(s):`)
    for (const problem of problems) console.error(`  - ${problem}`)
    process.exit(1)
  }
}

await main()

# gim-website

The official site for gim at <https://g.im>: what gim is and where to download the clients.
English at `/`, Chinese at `/zh/`; light and dark theme.

Astro (static output), Tailwind CSS v4, shadcn-style components, React islands only for the theme
and language pickers. Fonts are self-hosted through `@fontsource`. No analytics, no tracking.

## Pages

| Path | Page |
|---|---|
| `/`, `/zh/` | Landing: what gim is, built-in servers, self-hosting |
| `/download/`, `/zh/download/` | Downloads: Android, macOS, iOS and Windows (coming soon), CLI |

Language: the English pages carry an inline script that sends a browser whose first preferred
language is Chinese to the `/zh/` page before first paint. Picking a language in the header
stores the choice (`localStorage` key `gim-site-lang`), which overrides the browser.

## Download links

The client builds are GitHub pre-releases, which `/releases/latest` does not return. At build time
`src/features/download/releases.ts` reads `GET /repos/{repo}/releases` (pre-releases included) for
`gimhq/gim-android` (`.apk`) and `gimhq/gim-mac` (`.zip`), takes the newest published release with
a matching asset and links the asset directly with version, date, size and SHA-256. If the API call
fails, the card links the repository's releases page instead. `GITHUB_TOKEN` is used when set
(CI passes the workflow token) to avoid the anonymous rate limit.

The Deploy workflow rebuilds daily and on manual dispatch, so new releases show up without a commit.

## Develop

```sh
bun install
bun run dev        # serves gim.localhost through nsl (port 4321, PORT and NSL_NAME override)
```

`astro dev` daemonises itself, so the dev server keeps running after the command returns:

```sh
bun run dev:logs   # follow it
bun run dev:stop   # shut it down
```

Gate (CI runs the same):

```sh
bun run lint && bun run typecheck && bun run test && bun run build
```

Output is `dist/`.

## Deploy

Hosted on Cloudflare Workers as static assets (`wrangler.jsonc`: `./dist`, no Worker script),
bound to `g.im` and `www.g.im` as custom domains.

- `.github/workflows/ci.yml`: lint, typecheck, test and build on every push and pull request.
- `.github/workflows/deploy.yml`: builds and uploads with `wrangler deploy` on push to `main`,
  daily at 03:17 UTC and on `workflow_dispatch`.

Check the config locally without uploading: `bun x wrangler@4.131.2 deploy --dry-run` (after
`bun run build`).

### One-time setup for the owner

1. Repository secrets (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_ACCOUNT_ID`: the account that holds the `g.im` zone.
   - `CLOUDFLARE_API_TOKEN`: an API token with **Account › Workers Scripts › Edit** and, for the
     custom domains, **Zone › Workers Routes › Edit** and **Zone › DNS › Edit** on `g.im`.
2. The `g.im` zone must be active on that Cloudflare account: add the site in the Cloudflare
   dashboard and switch the nameservers at the registrar (currently `ns1/ns2.tname.com`) to the
   two Cloudflare assigns. Copy the existing records first (e.g. `hub.g.im`, `keep.g.im`), so they
   keep resolving. Wrangler then creates the `g.im` and `www.g.im` records itself.
3. Run the Deploy workflow once (Actions → Deploy → Run workflow), or push to `main`.

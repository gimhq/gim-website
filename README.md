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

The Pages workflow rebuilds daily and on manual dispatch, so new releases show up without a commit.

## Develop

```sh
bun install
bun run dev        # http://localhost:4321
```

Gate (CI runs the same):

```sh
bun run lint && bun run typecheck && bun run test && bun run build
```

Output is `dist/`.

## Deploy

- `.github/workflows/ci.yml`: lint, typecheck, test and build on every push and pull request.
- `.github/workflows/pages.yml`: builds and deploys to GitHub Pages on push to `main`, daily at
  03:17 UTC and on `workflow_dispatch`. `public/CNAME` holds `g.im`.

### One-time setup for the owner

1. GitHub Pages on a private repository needs a paid plan; otherwise make the repository public
   (Settings → General → Danger Zone → Change visibility).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Settings → Pages → Custom domain: `g.im`, then enable **Enforce HTTPS** once the certificate
   is issued.
4. At the registrar of `g.im`, add the GitHub Pages apex records (remove other `A`/`AAAA`
   records on the apex first):

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |

   Optionally `www` as `CNAME` to `gimhq.github.io`, which GitHub then redirects to `g.im`.
5. Optional: verify `g.im` for the `gimhq` organization (org Settings → Pages → Verified domains,
   a `TXT` record) so no other account can claim it.
6. Run the Pages workflow once (Actions → Pages → Run workflow), or push to `main`.

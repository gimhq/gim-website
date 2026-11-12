# gim documentation

User documentation published on <https://g.im/docs/>. English files sit here, Chinese ones under
`zh/` with the same paths. A file is published only when `published-docs.json` lists it; every
document starts with an H1, which becomes the page title. Link between documents with relative
`.md` paths; `scripts/prepare-docs.ts` rewrites them for the site.

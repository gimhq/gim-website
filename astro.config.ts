import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { DOC_GROUPS } from './src/shared/docs/published'
import { en } from './src/shared/i18n/en'
import { zh } from './src/shared/i18n/zh'

// The sidebar mirrors the published-docs.json allowlist; group labels come from
// the same dictionaries the rest of the site uses.
const sidebar = DOC_GROUPS.map(group => ({
  label: en.docs.groups[group.id],
  translations: { 'zh-CN': zh.docs.groups[group.id] },
  items: group.docs.map(doc => ({ slug: `docs/${doc.slug}` })),
}))

export default defineConfig({
  site: 'https://g.im',
  trailingSlash: 'always',
  integrations: [
    react(),
    starlight({
      title: { 'en': en.docs.title, 'zh-CN': zh.docs.title },
      defaultLocale: 'root',
      locales: {
        root: { label: en.label, lang: 'en' },
        zh: { label: zh.label, lang: 'zh-CN' },
      },
      customCss: ['./src/styles/global.css'],
      favicon: '/favicon.svg',
      components: {
        Header: './src/components/starlight/Header.astro',
        ThemeProvider: './src/components/starlight/ThemeProvider.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        Head: './src/components/starlight/Head.astro',
      },
      sidebar,
      disable404Route: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    // nsl fronts the dev server on *.localhost and a public dev domain, and
    // that domain is not fixed.
    allowedHosts: true,
  },
})

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://g.im',
  trailingSlash: 'always',
  integrations: [react()],
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

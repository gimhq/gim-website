export type FeatureIcon = 'lock' | 'key' | 'life-buoy' | 'server' | 'network' | 'smartphone'

interface Platform {
  name: string
  req: string
  note: string
}

/** The shape every locale dictionary satisfies. */
export interface Copy {
  label: string
  meta: {
    htmlLang: string
    title: string
    description: string
    downloadTitle: string
    downloadDescription: string
  }
  nav: {
    home: string
    download: string
    docs: string
    github: string
    themeLabel: string
    themeAuto: string
    themeLight: string
    themeDark: string
    langLabel: string
  }
  hero: { eyebrow: string, title: string, sub: string, cta: string, source: string }
  diagram: { label: string, sender: string, hub: string, receiver: string, message: string, cipher: string, caption: string }
  features: {
    title: string
    sub: string
    items: { icon: FeatureIcon, title: string, body: string }[]
  }
  servers: {
    title: string
    sub: string
    hub: { name: string, body: string }
    keep: { name: string, body: string }
  }
  selfHost: { title: string, sub: string, hub: string, keep: string, repo: string }
  download: {
    title: string
    sub: string
    get: string
    releases: string
    released: string
    version: string
    size: string
    sha256: string
    unavailable: string
    soon: string
    source: string
    platforms: {
      android: Platform
      macos: Platform & { steps: string[], terminal: string }
      ios: Platform
      windows: Platform
      cli: Platform & { usage: string }
    }
  }
  docs: {
    title: string
    heading: string
    sub: string
    groups: { start: string, servers: string }
  }
  footer: { org: string, tagline: string }
}

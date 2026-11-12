import type { Copy } from './types'

export const en: Copy = {
  label: 'English',
  meta: {
    htmlLang: 'en',
    title: 'gim: end-to-end encrypted messaging',
    description: 'gim is an end-to-end encrypted messenger. Hubs deliver your messages and cannot read them; your account is a key you hold.',
    downloadTitle: 'Download gim',
    downloadDescription: 'gim for Android, macOS and the command line.',
  },
  nav: {
    home: 'gim home',
    download: 'Download',
    github: 'GitHub',
    themeLabel: 'Theme',
    themeAuto: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    langLabel: 'Language',
  },
  hero: {
    eyebrow: 'End-to-end encrypted instant messaging',
    title: 'Messages only the people in the chat can read',
    sub: 'gim encrypts every message and file on your device before it leaves. The servers that deliver them cannot read them, and your account is a key you hold, not a phone number.',
    cta: 'Download',
    source: 'Source on GitHub',
  },
  diagram: {
    label: 'A message on its way through a hub',
    sender: 'Your device',
    hub: 'Hub',
    receiver: 'Their device',
    message: 'See you at eight?',
    cipher: 'ciphertext',
    caption: 'Encrypted on your device, decrypted on theirs. The hub only passes it on.',
  },
  features: {
    title: 'How gim works',
    sub: 'A few ideas, each of them in the code.',
    items: [
      {
        icon: 'lock',
        title: 'Encrypted end to end',
        body: 'Chats use MLS (RFC 9420). Messages, images and files are encrypted on the sender\'s device and decrypted only by the members of the chat.',
      },
      {
        icon: 'key',
        title: 'Your account is a key',
        body: 'Creating an account makes a root key on your device, and your account ID is derived from it. No phone number or email is asked for.',
      },
      {
        icon: 'life-buoy',
        title: 'Recovery kit',
        body: 'Your account ID and recovery key, saved together once. If you lose every device, the kit brings your account back on a new one.',
      },
      {
        icon: 'server',
        title: 'Hubs deliver, not read',
        body: 'Hubs are the servers that pass messages between devices. They carry ciphertext and never see what you write.',
      },
      {
        icon: 'network',
        title: 'More than one hub',
        body: 'An account can be on several hubs at once. While one is down, messages keep arriving through the others. Hubs that federate let their users talk to each other.',
      },
      {
        icon: 'smartphone',
        title: 'Linked devices',
        body: 'Add a phone or a computer by scanning a QR code and checking that both screens show the same six-digit code.',
      },
    ],
  },
  servers: {
    title: 'Built-in servers, yours to change',
    sub: 'The apps start with these two. Both can be changed in the app, and the keep server can be turned off.',
    hub: {
      name: 'Hub',
      body: 'Delivers messages and files between devices, encrypted end to end.',
    },
    keep: {
      name: 'Keep server',
      body: 'Stores only an encrypted backup of your privacy settings, including who you blocked, sealed with a key from your root key, and the reports you choose to send. A report carries the messages you pick in plain text, so moderators can read them.',
    },
  },
  selfHost: {
    title: 'Run your own',
    sub: 'The server source code is public on GitHub.',
    hub: 'The hub, in Rust: client API, federation between hubs and multi-homing. Linux builds and a Dockerfile.',
    keep: 'The keep server, on Bun: sealed settings storage and the moderators\' report inbox.',
    repo: 'Repository',
  },
  download: {
    title: 'Download gim',
    sub: 'Builds are early pre-releases, for testing. Links point at the newest release of each app.',
    get: 'Download',
    releases: 'All releases',
    released: 'Released',
    version: 'Version',
    size: 'Size',
    sha256: 'SHA-256',
    unavailable: 'The newest build could not be looked up. Pick one on the releases page.',
    soon: 'Coming soon',
    source: 'Source: ',
    platforms: {
      android: {
        name: 'Android',
        req: 'Android 8.0 or later · arm64 and x86_64',
        note: 'Signed with a debug key, for testing on devices. Allow installing apps from your browser or file manager when Android asks.',
      },
      macos: {
        name: 'macOS',
        req: 'macOS 15 or later · Apple silicon and Intel',
        note: 'Ad-hoc signed, not notarized. The first time:',
        steps: [
          'Unzip the download and move GIM.app to Applications.',
          'Open it. When macOS says it cannot verify the app, close the dialog.',
          'Open System Settings › Privacy & Security, scroll down and click Open Anyway.',
        ],
        terminal: 'Or clear the quarantine flag in Terminal:',
      },
      ios: {
        name: 'iOS',
        req: '',
        note: 'Needs distribution through the App Store or TestFlight, which is not set up yet.',
      },
      windows: {
        name: 'Windows',
        req: '',
        note: 'The Windows app is in development.',
      },
      cli: {
        name: 'Command line',
        req: 'Linux · built from source',
        note: 'gim is a command-line client for scripts and testing, in gim-client-sdk. Build it with a Rust toolchain and a C compiler:',
        usage: 'Every command takes a profile directory; register creates one on hub.g.im:',
      },
    },
  },
  footer: {
    org: 'GitHub',
    tagline: 'End-to-end encrypted messaging',
  },
}

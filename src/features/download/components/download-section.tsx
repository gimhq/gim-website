import type { Release, ReleasePlatform } from '../releases'
import type { Copy } from '@/shared/i18n'
import { Laptop, Monitor, Smartphone, Tablet, Terminal } from 'lucide-react'
import { REPOS } from '@/features/landing/links'
import { CodeBlock, PlatformCard, ReleaseDownload } from './platform-card'

const iconClass = 'size-5'

export const CLI_BUILD = `git clone https://github.com/gimhq/gim-client-sdk.git
cd gim-client-sdk
cargo build --release -p gim-cli   # -> target/release/gim`

export const CLI_USAGE = `gim --profile ~/.gim register alice "Alice"
gim --profile ~/.gim whoami`

export const MAC_UNQUARANTINE = 'xattr -dr com.apple.quarantine /Applications/GIM.app'

export function DownloadSection({ copy, releases }: { copy: Copy, releases: Record<ReleasePlatform, Release> }) {
  const d = copy.download
  const p = d.platforms
  return (
    <section className="pt-16 sm:pt-20">
      <div className="mb-10 max-w-[62ch]">
        <h1 className="m-0 text-[clamp(30px,5vw,44px)] leading-[1.15] font-semibold tracking-tight">{d.title}</h1>
        <p className="mt-3 mb-0 text-muted-foreground sm:text-base">{d.sub}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PlatformCard icon={<Smartphone className={iconClass} aria-hidden="true" />} name={p.android.name} req={p.android.req}>
          <ReleaseDownload release={releases.android} copy={copy} />
          <p className="m-0 leading-6 text-muted-foreground">{p.android.note}</p>
        </PlatformCard>

        <PlatformCard icon={<Laptop className={iconClass} aria-hidden="true" />} name={p.macos.name} req={p.macos.req}>
          <ReleaseDownload release={releases.macos} copy={copy} />
          <div className="leading-6 text-muted-foreground">
            <p className="m-0">{p.macos.note}</p>
            <ol className="mt-1 mb-2 list-decimal space-y-0.5 pl-5">
              {p.macos.steps.map(step => <li key={step}>{step}</li>)}
            </ol>
            <p className="m-0 mb-2">{p.macos.terminal}</p>
            <CodeBlock>{MAC_UNQUARANTINE}</CodeBlock>
          </div>
        </PlatformCard>

        <PlatformCard icon={<Tablet className={iconClass} aria-hidden="true" />} name={p.ios.name} req={p.ios.req} badge={d.soon}>
          <p className="m-0 leading-6 text-muted-foreground">{p.ios.note}</p>
        </PlatformCard>

        <PlatformCard icon={<Monitor className={iconClass} aria-hidden="true" />} name={p.windows.name} req={p.windows.req} badge={d.soon}>
          <p className="m-0 leading-6 text-muted-foreground">{p.windows.note}</p>
        </PlatformCard>

        <PlatformCard
          icon={<Terminal className={iconClass} aria-hidden="true" />}
          name={p.cli.name}
          req={p.cli.req}
          className="md:col-span-2"
        >
          <p className="m-0 leading-6 text-muted-foreground">
            {p.cli.note}
          </p>
          <CodeBlock>{CLI_BUILD}</CodeBlock>
          <p className="m-0 leading-6 text-muted-foreground">{p.cli.usage}</p>
          <CodeBlock>{CLI_USAGE}</CodeBlock>
          <a href={REPOS.cli} className="self-start text-sm">
            {d.source}
            gimhq/gim-client-sdk/apps/gim-cli
          </a>
        </PlatformCard>
      </div>
    </section>
  )
}

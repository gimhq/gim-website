import type { ReactNode } from 'react'
import type { Release } from '../releases'
import type { Copy } from '@/shared/i18n'
import { Download, ExternalLink } from 'lucide-react'
import { ButtonLink } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { formatDate, formatSize } from '../format'

interface PlatformCardProps {
  icon: ReactNode
  name: string
  req: string
  /** Shown as a muted badge instead of a download, e.g. "Coming soon". */
  badge?: string
  className?: string
  children?: ReactNode
}

export function PlatformCard({ icon, name, req, badge, className, children }: PlatformCardProps) {
  return (
    <Card className={cn('gap-4', className)}>
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 text-lg font-semibold tracking-tight">{name}</h2>
          {req && <p className="m-0 text-[13px] text-muted-foreground">{req}</p>}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground ring-1 ring-foreground/10">
            {badge}
          </span>
        )}
      </div>
      {children}
    </Card>
  )
}

/** The download button and release facts, or a link to the releases page. */
export function ReleaseDownload({ release, copy }: { release: Release, copy: Copy }) {
  const d = copy.download
  if (!release.ok) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="m-0 text-muted-foreground">{d.unavailable}</p>
        <ButtonLink variant="primary" href={release.releasesUrl}>
          {d.releases}
          <ExternalLink aria-hidden="true" />
        </ButtonLink>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink variant="primary" href={release.assetUrl} className="h-10 px-4" download>
          <Download aria-hidden="true" />
          {d.get}
        </ButtonLink>
        <a href={release.releasesUrl} className="text-sm">{d.releases}</a>
      </div>
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
        <dt className="text-muted-foreground">{d.version}</dt>
        <dd className="m-0 min-w-0 truncate font-mono">
          <a href={release.releaseUrl}>{release.version}</a>
        </dd>
        <dt className="text-muted-foreground">{d.released}</dt>
        <dd className="m-0">
          <time dateTime={release.publishedAt}>{formatDate(release.publishedAt, copy.meta.htmlLang)}</time>
        </dd>
        <dt className="text-muted-foreground">{d.size}</dt>
        <dd className="m-0">
          {formatSize(release.assetSize)}
          {' · '}
          <span className="font-mono">{release.assetName}</span>
        </dd>
        {release.sha256 && (
          <>
            <dt className="text-muted-foreground">{d.sha256}</dt>
            <dd className="m-0 font-mono text-xs break-all text-muted-foreground">{release.sha256}</dd>
          </>
        )}
      </dl>
    </div>
  )
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="m-0 overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-[13px] leading-6 ring-1 ring-foreground/10">
      <code>{children}</code>
    </pre>
  )
}

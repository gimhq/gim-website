import type { LucideIcon } from 'lucide-react'
import type { Copy, MultiHubIcon } from '@/shared/i18n'
import { ArrowRight, ArrowRightLeft, Laptop, Network, ServerCrash, ShieldCheck, Smartphone } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { SectionHeading } from './section-heading'

const ICONS: Record<MultiHubIcon, LucideIcon> = {
  'server-crash': ServerCrash,
  'arrow-right-left': ArrowRightLeft,
  'shield-check': ShieldCheck,
  'network': Network,
}

interface HubRow {
  host: string
  label?: string
  up: boolean
}

function Connector({ up }: { up: boolean }) {
  if (!up)
    return <span className="block h-0 w-full border-t-2 border-dashed border-muted-foreground/30" />
  return (
    <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-brand/25">
      {/* A message travelling from the hub to the devices. */}
      <span className="hub-flow absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand" />
    </span>
  )
}

function HubDiagram({ copy }: { copy: Copy }) {
  const d = copy.multiHub.diagram
  const hubs: HubRow[] = [
    { host: 'hub.g.im', up: true },
    { host: 'hub.example.org', label: d.own, up: true },
    { host: 'chat.example.net', label: d.friend, up: false },
  ]
  return (
    <figure className="m-0" aria-label={d.label}>
      <div className="grid grid-cols-[auto_minmax(24px,1fr)_auto] items-center gap-x-3 gap-y-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:gap-x-5 sm:p-6">
        <div className="row-span-3 flex flex-col items-center gap-2 rounded-xl bg-background/70 px-3 py-4 ring-1 ring-foreground/10 sm:px-5">
          <span className="flex items-center gap-1.5 text-brand">
            <Smartphone className="size-5" aria-hidden="true" />
            <Laptop className="size-6" aria-hidden="true" />
          </span>
          <span className="text-center text-[13px] text-muted-foreground">{d.you}</span>
        </div>
        {hubs.map((hub, index) => (
          <div key={hub.host} className="contents">
            <div style={{ gridRow: index + 1, gridColumn: 2 }}>
              <Connector up={hub.up} />
            </div>
            <div
              style={{ gridRow: index + 1, gridColumn: 3 }}
              className={cn(
                'flex min-w-0 items-center gap-2.5 rounded-xl bg-background/70 px-3 py-2.5 ring-1 ring-foreground/10',
                !hub.up && 'opacity-60',
              )}
            >
              <span
                className={cn('size-2 shrink-0 rounded-full', hub.up ? 'bg-emerald-500' : 'bg-red-500')}
                aria-hidden="true"
              />
              <span className="flex min-w-0 flex-col">
                <code className={cn('truncate font-mono text-[13px] text-foreground', !hub.up && 'line-through')}>
                  {hub.host}
                </code>
                <span className="text-xs text-muted-foreground">
                  {hub.label ? `${hub.label} · ` : ''}
                  {hub.up ? d.online : d.down}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-muted-foreground">{d.caption}</figcaption>
    </figure>
  )
}

export function MultiHubSection({ copy, docsHref }: { copy: Copy, docsHref: string }) {
  const m = copy.multiHub
  return (
    <section aria-labelledby="multi-hub" className="pt-24">
      <SectionHeading id="multi-hub" title={m.title} sub={m.sub} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <HubDiagram copy={copy} />
        <div className="grid gap-4 sm:grid-cols-2">
          {m.items.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Card key={item.title} className="gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="m-0 text-base font-medium">{item.title}</h3>
                <p className="m-0 leading-6 text-muted-foreground">{item.body}</p>
              </Card>
            )
          })}
        </div>
      </div>
      <p className="mt-5 mb-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
        <span>{m.note}</span>
        <a href={docsHref} className="inline-flex items-center gap-1">
          {m.more}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </p>
    </section>
  )
}

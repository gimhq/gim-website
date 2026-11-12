import type { LucideIcon } from 'lucide-react'
import type { Copy, MultiHubIcon } from '@/shared/i18n'
import { ArrowRight, ArrowRightLeft, Network, ServerCrash, ShieldCheck } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { HubFlowDiagram } from './hub-flow-diagram'
import { SectionHeading } from './section-heading'

const ICONS: Record<MultiHubIcon, LucideIcon> = {
  'server-crash': ServerCrash,
  'arrow-right-left': ArrowRightLeft,
  'shield-check': ShieldCheck,
  'network': Network,
}

export function MultiHubSection({ copy, docsHref }: { copy: Copy, docsHref: string }) {
  const m = copy.multiHub
  return (
    <section aria-labelledby="multi-hub" className="pt-24">
      <SectionHeading id="multi-hub" title={m.title} sub={m.sub} />
      <HubFlowDiagram copy={copy} />
      <div className="mt-10">
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

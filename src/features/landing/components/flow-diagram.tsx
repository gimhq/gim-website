import type { ReactNode } from 'react'
import type { Copy } from '@/shared/i18n'
import { ArrowRight, Server, Smartphone } from 'lucide-react'

function Bubble({ text }: { text: string }) {
  return (
    <span className="rounded-2xl rounded-br-md bg-[#3b6fc9] px-3 py-1.5 text-sm text-white">{text}</span>
  )
}

function Node({ icon, label, children }: { icon: ReactNode, label: string, children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-3 rounded-xl bg-background/70 p-5 ring-1 ring-foreground/10">
      <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
        {icon}
        {label}
      </span>
      {children}
    </div>
  )
}

function Arrow() {
  return (
    <ArrowRight
      className="size-5 shrink-0 rotate-90 self-center text-muted-foreground/70 sm:rotate-0"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  )
}

/** Sender, hub, receiver: plaintext only at the two ends. */
export function FlowDiagram({ copy }: { copy: Copy }) {
  const d = copy.diagram
  const iconClass = 'size-4'
  return (
    <figure className="m-0 mx-auto max-w-[880px]" aria-label={d.label}>
      <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/10 sm:flex-row sm:p-4">
        <Node icon={<Smartphone className={iconClass} aria-hidden="true" />} label={d.sender}>
          <Bubble text={d.message} />
        </Node>
        <Arrow />
        <Node icon={<Server className={iconClass} aria-hidden="true" />} label={`${d.hub} · hub.g.im`}>
          <span className="flex flex-col items-center gap-1">
            <code className="font-mono text-[13px] tracking-tight text-foreground/80">9f3a…c07e41b2</code>
            <span className="text-xs text-muted-foreground">{d.cipher}</span>
          </span>
        </Node>
        <Arrow />
        <Node icon={<Smartphone className={iconClass} aria-hidden="true" />} label={d.receiver}>
          <Bubble text={d.message} />
        </Node>
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-muted-foreground">{d.caption}</figcaption>
    </figure>
  )
}

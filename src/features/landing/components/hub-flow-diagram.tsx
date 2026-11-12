import type { ReactNode } from 'react'
import type { Copy } from '@/shared/i18n'
import { useId } from 'react'
import { cn } from '@/shared/lib/utils'

interface Box { x: number, y: number, w: number, h: number }
type NodeId = 'alice' | 'a1' | 'a2' | 'b1' | 'b2' | 'bob'

interface Layout {
  w: number
  h: number
  nodes: Record<NodeId, Box>
  /** Lays edges out left to right (desktop) or top to bottom (mobile). */
  vertical: boolean
}

const DESKTOP: Layout = {
  w: 1000,
  h: 330,
  vertical: false,
  nodes: {
    alice: { x: 0, y: 120, w: 150, h: 90 },
    a1: { x: 240, y: 30, w: 230, h: 84 },
    a2: { x: 240, y: 216, w: 230, h: 84 },
    b1: { x: 560, y: 30, w: 210, h: 84 },
    b2: { x: 560, y: 216, w: 210, h: 84 },
    bob: { x: 850, y: 120, w: 150, h: 90 },
  },
}

const MOBILE: Layout = {
  w: 360,
  h: 660,
  vertical: true,
  nodes: {
    alice: { x: 100, y: 0, w: 160, h: 84 },
    a1: { x: 0, y: 160, w: 168, h: 96 },
    a2: { x: 192, y: 160, w: 168, h: 96 },
    b1: { x: 0, y: 400, w: 168, h: 96 },
    b2: { x: 192, y: 400, w: 168, h: 96 },
    bob: { x: 100, y: 576, w: 160, h: 84 },
  },
}

/** Where an edge leaves `from` and enters `to`, along the layout's direction. */
function ends(layout: Layout, from: Box, to: Box): [number, number, number, number] {
  return layout.vertical
    ? [from.x + from.w / 2, from.y + from.h, to.x + to.w / 2, to.y]
    : [from.x + from.w, from.y + from.h / 2, to.x, to.y + to.h / 2]
}

function curve(layout: Layout, [x1, y1, x2, y2]: [number, number, number, number]): string {
  if (layout.vertical) {
    const my = (y1 + y2) / 2
    return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
  }
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
}

function mid([x1, y1, x2, y2]: [number, number, number, number]): [number, number] {
  return [(x1 + x2) / 2, (y1 + y2) / 2]
}

function Node({ box, children, className }: { box: Box, children: ReactNode, className?: string }) {
  return (
    <foreignObject x={box.x} y={box.y} width={box.w} height={box.h}>
      <div
        className={cn(
          'flex h-full flex-col items-center justify-center gap-0.5 rounded-xl bg-card px-2 text-center ring-1 ring-foreground/10',
          className,
        )}
      >
        {children}
      </div>
    </foreignObject>
  )
}

function HubNode({ box, host, sub, down }: { box: Box, host: string, sub: string, down?: boolean }) {
  return (
    <Node box={box} className={cn(down && 'opacity-55')}>
      <span className="flex items-center gap-1.5">
        <span className={cn('size-2 shrink-0 rounded-full', down ? 'bg-red-500' : 'bg-emerald-500')} />
        <code className={cn('font-mono text-[13px] leading-5 text-foreground', down && 'line-through')}>{host}</code>
      </span>
      <span className="text-xs leading-4 text-muted-foreground">{sub}</span>
    </Node>
  )
}

function PersonNode({ box, name, sub }: { box: Box, name: string, sub: string }) {
  return (
    <Node box={box} className="bg-brand/10 ring-brand/30">
      <span className="text-[15px] leading-5 font-semibold text-foreground">{name}</span>
      <span className="text-xs leading-4 text-muted-foreground">{sub}</span>
    </Node>
  )
}

function Badge({ at: [x, y], n }: { at: [number, number], n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="var(--brand)" />
      <text x={x} y={y} dy="0.35em" textAnchor="middle" fontSize={12} fontWeight={600} fill="white">{n}</text>
    </g>
  )
}

function Diagram({ copy, layout, className }: { copy: Copy, layout: Layout, className?: string }) {
  const f = copy.multiHub.flow
  const id = useId().replace(/:/g, '')
  const n = layout.nodes
  const e1 = ends(layout, n.alice, n.a1)
  const e1b = ends(layout, n.alice, n.a2)
  // Alice's second hub hands what it got to the hub that runs the chat.
  const e1c: [number, number, number, number] = layout.vertical
    ? [n.a2.x, n.a2.y + n.a2.h / 2, n.a1.x + n.a1.w, n.a1.y + n.a1.h / 2]
    : [n.a2.x + n.a2.w / 2, n.a2.y, n.a1.x + n.a1.w / 2, n.a1.y + n.a1.h]
  const e2 = ends(layout, n.a1, n.b1)
  const e2b = ends(layout, n.a1, n.b2)
  const e3 = ends(layout, n.b1, n.bob)
  const e3b = ends(layout, n.b2, n.bob)
  // The path the moving dot follows, across the boxes it passes through.
  const through = (b: Box) => layout.vertical ? `L ${b.x + b.w / 2} ${b.y + b.h}` : `L ${b.x + b.w} ${b.y + b.h / 2}`
  const route = [curve(layout, e1), through(n.a1), curve(layout, e2).replace(/^M/, 'L'), through(n.b1), curve(layout, e3).replace(/^M/, 'L')].join(' ')
  const straight = ([x1, y1, x2, y2]: [number, number, number, number]) => `M ${x1} ${y1} L ${x2} ${y2}`

  return (
    <svg
      viewBox={`-4 -4 ${layout.w + 8} ${layout.h + 8}`}
      role="img"
      aria-label={f.label}
      className={cn('h-auto w-full overflow-visible', className)}
    >
      <defs>
        <marker id={`${id}-brand`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand)" />
        </marker>
        <marker id={`${id}-muted`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <g fill="none" strokeWidth={2}>
        <path d={curve(layout, e1b)} stroke="var(--muted-foreground)" strokeDasharray="5 5" strokeOpacity={0.6} markerEnd={`url(#${id}-muted)`} />
        <path d={straight(e1c)} stroke="var(--muted-foreground)" strokeDasharray="5 5" strokeOpacity={0.6} markerEnd={`url(#${id}-muted)`} />
        <path d={curve(layout, e2b)} stroke="var(--brand)" strokeDasharray="5 5" strokeOpacity={0.45} />
        <path d={curve(layout, e3b)} stroke="var(--muted-foreground)" strokeDasharray="5 5" strokeOpacity={0.35} />
        <path d={curve(layout, e1)} stroke="var(--brand)" markerEnd={`url(#${id}-brand)`} />
        <path d={curve(layout, e2)} stroke="var(--brand)" markerEnd={`url(#${id}-brand)`} />
        <path d={curve(layout, e3)} stroke="var(--brand)" markerEnd={`url(#${id}-brand)`} />
      </g>

      {/* Delivery to the hub that is down does not get through. */}
      <g transform={`translate(${e2b[2] - (layout.vertical ? 0 : 14)} ${e2b[3] - (layout.vertical ? 14 : 0)})`}>
        <circle r={8} fill="var(--background)" stroke="#ef4444" strokeWidth={1.5} />
        <path d="M -3.5 -3.5 L 3.5 3.5 M 3.5 -3.5 L -3.5 3.5" stroke="#ef4444" strokeWidth={1.5} />
      </g>

      <circle r={4.5} fill="var(--brand)" className="hub-flow-dot">
        <animateMotion dur="3.6s" repeatCount="indefinite" path={route} />
      </circle>

      <PersonNode box={n.alice} name={f.alice} sub={f.aliceDevices} />
      <HubNode box={n.a1} host="hub.g.im" sub={f.primary} />
      <HubNode box={n.a2} host="hub.example.org" sub={f.own} />
      <HubNode box={n.b1} host="hub.example.net" sub={f.bobHub} />
      <HubNode box={n.b2} host="chat.example.net" sub={f.down} down />
      <PersonNode box={n.bob} name={f.bob} sub={f.bobDevices} />

      <Badge at={mid(e1)} n={1} />
      <Badge at={mid(e2)} n={2} />
      <Badge at={mid(e3)} n={3} />
    </svg>
  )
}

/** Alice and Bob on different hubs: send, hand over between hubs, read from every hub. */
export function HubFlowDiagram({ copy }: { copy: Copy }) {
  const steps = copy.multiHub.flow.steps
  return (
    <figure className="m-0">
      <div className="rounded-2xl bg-card/60 p-4 ring-1 ring-foreground/10 sm:p-8">
        <Diagram copy={copy} layout={DESKTOP} className="hidden lg:block" />
        <Diagram copy={copy} layout={MOBILE} className="mx-auto max-w-[360px] lg:hidden" />
      </div>
      <figcaption>
        <p className="m-0 mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-brand" aria-hidden="true" />
            {copy.multiHub.flow.legendPath}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-6 border-t-2 border-dashed border-muted-foreground/60" aria-hidden="true" />
            {copy.multiHub.flow.legendFallback}
          </span>
        </p>
        <ol className="m-0 mt-5 grid list-none gap-4 p-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-muted-foreground">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}

import type { Copy } from '@/shared/i18n'
import { ArrowUpRight } from 'lucide-react'
import { REPOS } from '../links'
import { SectionHeading } from './section-heading'

function RepoCard({ name, href, body, label }: { name: string, href: string, body: string, label: string }) {
  return (
    <a
      href={href}
      aria-label={`${name} · ${label}`}
      className="group flex flex-col gap-2 rounded-xl bg-card p-6 text-sm text-card-foreground no-underline ring-1 ring-foreground/10 transition-colors hover:text-card-foreground hover:no-underline hover:ring-brand/50"
    >
      <span className="flex items-center gap-2">
        <code className="font-mono text-base">
          gimhq/
          {name}
        </code>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden="true" />
      </span>
      <p className="m-0 leading-6 text-muted-foreground">{body}</p>
    </a>
  )
}

export function SelfHostSection({ copy }: { copy: Copy }) {
  const s = copy.selfHost
  return (
    <section aria-labelledby="self-host" className="pt-24">
      <SectionHeading id="self-host" title={s.title} sub={s.sub} />
      <div className="grid gap-4 md:grid-cols-2">
        <RepoCard name="gim-hub" href={REPOS.hub} body={s.hub} label={s.repo} />
        <RepoCard name="gim-keep" href={REPOS.keep} body={s.keep} label={s.repo} />
      </div>
    </section>
  )
}

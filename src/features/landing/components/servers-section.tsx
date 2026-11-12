import type { Copy } from '@/shared/i18n'
import { Card } from '@/shared/components/ui/card'
import { SectionHeading } from './section-heading'

function ServerCard({ host, name, body }: { host: string, name: string, body: string }) {
  return (
    <Card className="gap-2">
      <span className="text-[13px] text-muted-foreground">{name}</span>
      <code className="font-mono text-lg text-foreground">{host}</code>
      <p className="m-0 mt-1 leading-6 text-muted-foreground">{body}</p>
    </Card>
  )
}

export function ServersSection({ copy }: { copy: Copy }) {
  const s = copy.servers
  return (
    <section aria-labelledby="servers" className="pt-24">
      <SectionHeading id="servers" title={s.title} sub={s.sub} />
      <div className="grid gap-4 md:grid-cols-2">
        <ServerCard host="hub.g.im" name={s.hub.name} body={s.hub.body} />
        <ServerCard host="keep.g.im" name={s.keep.name} body={s.keep.body} />
      </div>
    </section>
  )
}

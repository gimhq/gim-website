import type { LucideIcon } from 'lucide-react'
import type { Copy, FeatureIcon } from '@/shared/i18n'
import { EyeOff, KeyRound, LifeBuoy, Lock, Server, Smartphone } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { SectionHeading } from './section-heading'

const ICONS: Record<FeatureIcon, LucideIcon> = {
  'lock': Lock,
  'key': KeyRound,
  'life-buoy': LifeBuoy,
  'server': Server,
  'eye-off': EyeOff,
  'smartphone': Smartphone,
}

export function FeaturesSection({ copy }: { copy: Copy }) {
  return (
    <section aria-labelledby="features" className="pt-24">
      <SectionHeading id="features" title={copy.features.title} sub={copy.features.sub} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.features.items.map((item) => {
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
    </section>
  )
}

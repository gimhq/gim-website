import type { Copy } from '@/shared/i18n'
import { ArrowRight, Lock } from 'lucide-react'
import { ButtonLink } from '@/shared/components/ui/button'
import { GITHUB_ORG_URL } from '../links'

export function HeroSection({ copy, downloadHref }: { copy: Copy, downloadHref: string }) {
  return (
    <section className="flex flex-col items-center pt-16 pb-14 text-center sm:pt-24">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[13px] text-muted-foreground ring-1 ring-foreground/10">
        <Lock className="size-3.5 text-brand" strokeWidth={2} aria-hidden="true" />
        {copy.hero.eyebrow}
      </span>
      <h1 className="mt-6 mb-0 max-w-[20ch] text-[clamp(34px,6.4vw,60px)] leading-[1.1] font-semibold tracking-tight text-balance">
        {copy.hero.title}
      </h1>
      <p className="mt-6 mb-0 max-w-[62ch] text-base leading-7 text-balance text-muted-foreground sm:text-[17px]">
        {copy.hero.sub}
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink variant="primary" href={downloadHref} className="h-10 px-5">
          {copy.hero.cta}
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
        <ButtonLink variant="secondary" href={GITHUB_ORG_URL} className="h-10 px-5">
          {copy.hero.source}
        </ButtonLink>
      </div>
    </section>
  )
}

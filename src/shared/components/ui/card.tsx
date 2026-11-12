import type * as React from 'react'
import { cn } from '@/shared/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex min-w-0 flex-col gap-4 rounded-xl bg-card p-6 text-sm text-card-foreground ring-1 ring-foreground/10',
        className,
      )}
      {...props}
    />
  )
}

export { Card }

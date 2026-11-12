export function SectionHeading({ id, title, sub }: { id?: string, title: string, sub?: string }) {
  return (
    <div className="mb-8 max-w-[60ch]">
      <h2 id={id} className="m-0 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 mb-0 text-muted-foreground">{sub}</p>}
    </div>
  )
}

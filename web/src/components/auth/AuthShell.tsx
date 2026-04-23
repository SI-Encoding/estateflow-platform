import type { PropsWithChildren, ReactNode } from 'react'

interface AuthShellProps extends PropsWithChildren {
  eyebrow: string
  title: string
  description: string
  footer?: ReactNode
}

export function AuthShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <section className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur">
      <div className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold text-stone-50">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>

      <div className="space-y-5">
        {children}
        {footer ? <div className="text-sm text-slate-300">{footer}</div> : null}
      </div>
    </section>
  )
}

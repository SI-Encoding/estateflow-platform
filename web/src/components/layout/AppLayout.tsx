import type { PropsWithChildren } from 'react'
import { Header } from '@/components/layout/Header'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen px-4 py-6 text-stone-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}

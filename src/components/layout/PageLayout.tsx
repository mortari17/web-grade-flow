import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4 w-full">{children}</main>
      <Footer />
    </div>
  )
}

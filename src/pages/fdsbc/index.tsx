import { FdsbcGradeCalculator } from './components/GradeCalculator'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Scale } from 'lucide-react'

export function FdsbcPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-950">
      <Header
        institution="FDSBC"
        accentClass="bg-amber-400"
        icon={<Scale className="h-6 w-6 text-blue-950" />}
      />

      <main className="flex-1 container max-w-3xl mx-auto py-8 px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-400">
            De quanto você precisa? GradeFlow sabe!
          </h2>
          <p className="text-sm text-blue-300 mt-1">
            Calcule sua média seguindo o modelo de avaliação da FDSBC
          </p>
        </div>

        <FdsbcGradeCalculator />
      </main>

      <Footer />
    </div>
  )
}

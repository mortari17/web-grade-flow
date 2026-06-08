import { AbsenceCalculator } from '@/pages/fiap/components/AbsenceCalculator'
import { GradeCalculator } from '@/pages/fiap/components/GradeCalculator'
import { GraduationCap, CalendarCheck } from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TabsComponent } from '@/components/Tabs'

const tabsList = [
  {
    icon: <GraduationCap className="h-4 w-4" />,
    label: 'Notas',
    content: <GradeCalculator />,
  },
  {
    icon: <CalendarCheck className="h-4 w-4" />,
    label: 'Faltas',
    content: <AbsenceCalculator />,
  },
]

export function FiapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Header />

      <main className="flex-1 container max-w-3xl mx-auto py-8 px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl text-primary font-bold tracking-tight">
            De quanto você precisa? Quantas vezes ainda pode faltar? GradeFlow sabe!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Calcule notas e faltas seguindo o modelo de avaliação FIAP
          </p>
        </div>

        <TabsComponent tabs={tabsList} />
      </main>

      <Footer />
    </div>
  )
}

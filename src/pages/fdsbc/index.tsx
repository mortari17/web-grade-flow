import { FdsbcGradeCalculator } from './components/GradeCalculator'
import { FdsbcAbsenceCalculator } from './components/AbsenceCalculator'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TabsComponent } from '@/components/Tabs'
import { GraduationCap, CalendarCheck } from 'lucide-react'

const tabsList = [
  {
    icon: <GraduationCap className="h-4 w-4" />,
    label: 'Notas',
    content: <FdsbcGradeCalculator />,
  },
  {
    icon: <CalendarCheck className="h-4 w-4" />,
    label: 'Faltas',
    content: <FdsbcAbsenceCalculator />,
  },
]

export function FdsbcPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-950">
      <Header
        institution="FDSBC"
        accentClass="bg-amber-400"
        icon={<GraduationCap className="h-6 w-6 text-blue-950" />}
        bgClass="bg-blue-950"
        borderClass="border-blue-800"
      />

      <main className="flex-1 container max-w-3xl mx-auto py-8 px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-400">
            De quanto você precisa? GradeFlow sabe!
          </h2>
          <p className="text-sm text-blue-300 mt-1">
            Calcule notas e faltas seguindo o modelo de avaliação da FDSBC
          </p>
        </div>

        <TabsComponent tabs={tabsList} variant="fdsbc" />
      </main>

      <Footer bgClass="bg-blue-950" borderClass="border-blue-800" iconColor="text-amber-400" />
    </div>
  )
}

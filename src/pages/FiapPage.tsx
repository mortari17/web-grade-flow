import { CalendarCheck, GraduationCap } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { IconTabs, type IconTabItem } from '@/components/shared/IconTabs'
import { AbsenceCalculator } from '@/features/absences'
import { GradeCalculator } from '@/features/grades'

const TABS: IconTabItem[] = [
  {
    value: 'grades',
    icon: <GraduationCap className="h-4 w-4" />,
    label: 'Notas',
    content: <GradeCalculator />,
  },
  {
    value: 'absences',
    icon: <CalendarCheck className="h-4 w-4" />,
    label: 'Faltas',
    content: <AbsenceCalculator />,
  },
]

export function FiapPage() {
  return (
    <PageLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl text-primary font-bold tracking-tight">
          De quanto você precisa? Quantas vezes ainda pode faltar? GradeFlow sabe!
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Calcule notas e faltas seguindo o modelo de avaliação FIAP
        </p>
      </div>

      <IconTabs tabs={TABS} />
    </PageLayout>
  )
}

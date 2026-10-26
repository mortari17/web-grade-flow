import { GraduationCap } from 'lucide-react'
import { CalculatorCard } from '@/components/shared/CalculatorCard'
import { FormActions } from '@/components/shared/FormActions'
import { FormField } from '@/components/shared/FormField'
import { SelectField } from '@/components/shared/SelectField'
import { cn } from '@/lib/utils'
import { PERIOD_OPTIONS } from '../constants'
import { useGradeCalculator } from '../hooks/useGradeCalculator'
import { useGradeHistory } from '../hooks/useGradeHistory'
import { GradeHistory } from './GradeHistory'
import { GradeInput } from './GradeInput'
import { GradeResult } from './GradeResult'
import { SemesterGrades } from './SemesterGrades'

export function GradeCalculator() {
  const history = useGradeHistory()
  const calculator = useGradeCalculator({ onCalculated: history.add })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
      <GradeCalculatorCard calculator={calculator} />
      <aside className={cn(history.entries.length === 0 && 'hidden lg:block')}>
        <GradeHistory
          entries={history.entries}
          onSelect={calculator.load}
          onClear={history.clear}
        />
      </aside>
    </div>
  )
}

function GradeCalculatorCard({
  calculator,
}: {
  calculator: ReturnType<typeof useGradeCalculator>
}) {
  const { result, isYear, errors } = calculator

  if (result) {
    return (
      <CalculatorCard
        icon={GraduationCap}
        eyebrow="FIAP · Resultado"
        title="Resultado do Cálculo"
        titleClassName="text-primary"
        description={isYear ? 'Cálculo por ano' : 'Cálculo por semestre'}
      >
        <GradeResult
          result={result}
          targetGrade={calculator.effectiveTarget}
          onReset={calculator.reset}
        />
      </CalculatorCard>
    )
  }

  return (
    <CalculatorCard
      icon={GraduationCap}
      eyebrow="FIAP · Notas"
      title="Calculadora de Notas"
      description="Calcule sua média ou quanto precisa tirar para passar"
      contentClassName="space-y-6"
    >
      <FormField id="period" label="Período">
        <SelectField
          id="period"
          value={calculator.period}
          options={PERIOD_OPTIONS}
          onValueChange={calculator.setPeriod}
          placeholder="Selecione o período"
        />
      </FormField>

      <SemesterGrades
        idPrefix="s1"
        title="1º Semestre"
        grades={calculator.firstSemester}
        errors={errors.firstSemester}
        onChange={calculator.updateFirstSemester}
        showGsHint={!isYear}
      />

      {isYear && (
        <SemesterGrades
          idPrefix="s2"
          title="2º Semestre"
          grades={calculator.secondSemester}
          errors={errors.secondSemester}
          onChange={calculator.updateSecondSemester}
          showGsHint
        />
      )}

      <GradeInput
        id="target"
        label="Nota alvo"
        optional
        value={calculator.targetGrade}
        onChange={calculator.setTargetGrade}
        placeholder="6,00 (padrão FIAP)"
        allowEmpty
        error={errors.targetGrade}
        description="Deixe em branco para usar a média mínima FIAP (6,00), ou informe uma nota específica"
      />

      <FormActions onSubmit={calculator.calculate} onReset={calculator.reset} />
    </CalculatorCard>
  )
}

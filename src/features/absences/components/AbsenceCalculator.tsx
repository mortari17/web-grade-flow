import { CalendarCheck } from 'lucide-react'
import { CalculatorCard } from '@/components/shared/CalculatorCard'
import { FormActions } from '@/components/shared/FormActions'
import { FormField } from '@/components/shared/FormField'
import { FormInput } from '@/components/shared/FormInput'
import { SelectField } from '@/components/shared/SelectField'
import { CLASSES_OPTIONS } from '../constants'
import { useAbsenceCalculator } from '../hooks/useAbsenceCalculator'
import { AbsenceResult } from './AbsenceResult'

export function AbsenceCalculator() {
  const calculator = useAbsenceCalculator()
  const { errors } = calculator

  return (
    <CalculatorCard
      icon={CalendarCheck}
      eyebrow="FIAP · Faltas"
      title="Calculadora de Faltas"
      description="Calcule quantas faltas ainda pode ter sem estourar o limite de 25%"
      contentClassName="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <FormField id="absences" label="Faltas" error={errors.absences}>
          <FormInput
            id="absences"
            inputMode="numeric"
            value={calculator.absences}
            onChange={(e) => calculator.setAbsences(e.target.value)}
            placeholder="0"
            maxLength={calculator.maxAbsencesDigits}
            invalid={Boolean(errors.absences)}
          />
        </FormField>
        <FormField id="classes" label="Total de Aulas" error={errors.classes}>
          <SelectField
            id="classes"
            value={calculator.classes}
            options={CLASSES_OPTIONS}
            onValueChange={calculator.setClasses}
          />
        </FormField>
      </div>

      <FormActions onSubmit={calculator.calculate} onReset={calculator.reset} />

      {calculator.result && <AbsenceResult result={calculator.result} />}
    </CalculatorCard>
  )
}

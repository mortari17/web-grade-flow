import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateAbsence } from '@/pages/fiap/utils/grade-calculator'
import { CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAbsenceCalculator } from '@/pages/fiap/hooks/useAbsenceCalculator'
import { UI_MESSAGES } from '../utils/constants'
import { ButtonComponent } from '@/components/Button'
import { AbsenceResponse } from '@/lib/types'
import { AbsenceResult } from './AbsenceResult'

export function AbsenceCalculator() {
  const [absences, setAbsences] = useState('')
  const [classes, setClasses] = useState('')
  const [result, setResult] = useState<AbsenceResponse | null>(null)
  const [errors, setErrors] = useState({ absences: '', classes: '' })

  const { handleAbsencesChange, handleClassesChange } = useAbsenceCalculator({
    setAbsences,
    setClasses,
  })

  function validate(): boolean {
    const newErrors = { absences: '', classes: '' }
    const a = Number(absences)
    const c = Number(classes)

    if (!absences || !Number.isInteger(a) || a < 0)
      newErrors.absences = UI_MESSAGES.errorValidationAbsences
    if (!classes || !Number.isInteger(c) || c <= 0)
      newErrors.classes = UI_MESSAGES.errorValidationClasses

    setErrors(newErrors)
    return !newErrors.absences && !newErrors.classes
  }

  function handleCalculate() {
    if (!validate()) return
    setResult(calculateAbsence({ absences: Number(absences), classes: Number(classes) }))
  }

  function handleReset() {
    setAbsences('')
    setClasses('')
    setResult(null)
    setErrors({ absences: '', classes: '' })
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-lg bg-neutral-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <CalendarCheck className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            FIAP · Faltas
          </span>
        </div>
        <CardTitle className="text-xl text-neutral-300">Calculadora de Faltas</CardTitle>
        <CardDescription>
          Calcule quantas faltas ainda pode ter sem estourar o limite de 25%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="classes">
              <span className="text-neutral-300">Total de Aulas</span>
            </Label>
            <Input
              id="classes"
              type="text"
              inputMode="numeric"
              value={classes}
              onChange={handleClassesChange}
              placeholder="Ex: 80"
              className={cn(
                'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
                '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
                errors.classes && 'border-destructive',
              )}
            />
            {errors.classes && <p className="text-xs text-destructive">{errors.classes}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="absences">
              <span className="text-neutral-300">Faltas</span>
            </Label>
            <Input
              id="absences"
              type="text"
              inputMode="numeric"
              value={absences}
              onChange={handleAbsencesChange}
              placeholder="Ex: 10"
              className={cn(
                'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
                '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
                errors.absences && 'border-destructive',
              )}
            />
            {errors.absences && <p className="text-xs text-destructive">{errors.absences}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <ButtonComponent
            label="Calcular"
            onClick={handleCalculate}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          />
          <ButtonComponent
            label="Limpar"
            onClick={handleReset}
            className="border-black/20 dark:border-white/20 text-white bg-neutral-700"
          />
        </div>

        {result && <AbsenceResult result={result} />}
      </CardContent>
    </Card>
  )
}

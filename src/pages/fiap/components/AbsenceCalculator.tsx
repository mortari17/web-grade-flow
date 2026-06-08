import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculateAbsence } from '@/pages/fiap/utils/grade-calculator'
import { CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAbsenceCalculator } from '@/pages/fiap/hooks/useAbsenceCalculator'
import { EnumClasses } from '../types'
import { UI_MESSAGES } from '../utils/constants'
import { ButtonComponent } from '@/components/Button'
import { AbsenceResponse } from '@/lib/types'
import { AbsenceResult } from './AbsenceResult'

export function AbsenceCalculator() {
  const [absences, setAbsences] = useState('')
  const [classes, setClasses] = useState<EnumClasses | string>(EnumClasses.CLASSES_80)
  const [result, setResult] = useState<AbsenceResponse | null>(null)
  const [errors, setErrors] = useState({ absences: '', classes: '' })

  const { calculateDays, handleAbsencesChange } = useAbsenceCalculator({ setAbsences, classes })

  function validate(): boolean {
    const newErrors = { absences: '', classes: '' }
    const a = Number(absences)
    const c = Number(classes)

    if (!absences || a < 0) newErrors.absences = UI_MESSAGES.errorValidationAbsences
    if (!classes || c <= 0) newErrors.classes = UI_MESSAGES.errorValidationClasses

    setErrors(newErrors)
    return !newErrors.absences && !newErrors.classes
  }

  function handleCalculate() {
    if (!validate()) return
    const res = calculateAbsence({ absences: Number(absences), classes: Number(classes) })
    setResult(res)
  }

  function handleReset() {
    setAbsences('')
    setClasses(EnumClasses.CLASSES_80)
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
            <Label htmlFor="absences">
              <span className="text-neutral-300">Faltas</span>
            </Label>
            <Input
              id="absences"
              type="text"
              value={absences}
              onChange={handleAbsencesChange}
              placeholder="0"
              maxLength={3}
              className={cn(
                'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
                '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
              )}
            />
            {errors.absences && <p className="text-xs text-destructive">{errors.absences}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="classes">
              <span className="text-neutral-300">Total de Aulas</span>
            </Label>
            <Select value={classes} onValueChange={setClasses}>
              <SelectTrigger className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border border-neutral-700 rounded-lg">
                <SelectItem
                  value={EnumClasses.CLASSES_80}
                  className="text-white hover:bg-neutral-600"
                >
                  80
                </SelectItem>
                <SelectItem
                  value={EnumClasses.CLASSES_160}
                  className="text-white hover:bg-neutral-600"
                >
                  160
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.classes && <p className="text-xs text-destructive">{errors.classes}</p>}
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

        {result && <AbsenceResult result={result} calculateDays={calculateDays} />}
      </CardContent>
    </Card>
  )
}

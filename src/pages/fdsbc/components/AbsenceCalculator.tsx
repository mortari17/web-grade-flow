import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateAbsence } from '@/pages/fiap/utils/grade-calculator'
import { GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAbsenceCalculator } from '@/pages/fiap/hooks/useAbsenceCalculator'
import { ButtonComponent } from '@/components/Button'
import { AbsenceResponse } from '@/lib/types'

const ERROR_ABSENCES = 'Digite um número inteiro maior ou igual a 0'
const ERROR_CLASSES = 'Digite um número inteiro maior que 0'

export function FdsbcAbsenceCalculator() {
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

    if (!absences || !Number.isInteger(a) || a < 0) newErrors.absences = ERROR_ABSENCES
    if (!classes || !Number.isInteger(c) || c <= 0) newErrors.classes = ERROR_CLASSES

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
    <Card className="border-t-4 border-t-amber-400 shadow-lg bg-blue-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-4 w-4 text-amber-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            FDSBC · Faltas
          </span>
        </div>
        <CardTitle className="text-xl text-blue-100">Calculadora de Faltas</CardTitle>
        <CardDescription className="text-blue-300">
          Calcule quantas faltas ainda pode ter sem estourar o limite de 25%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="fdsbc-classes">
              <span className="text-blue-200">Total de Aulas</span>
            </Label>
            <Input
              id="fdsbc-classes"
              type="text"
              inputMode="numeric"
              value={classes}
              onChange={handleClassesChange}
              placeholder="Ex: 80"
              className={cn(
                'bg-blue-800 border-blue-700 text-white placeholder-blue-400',
                '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
                errors.classes && 'border-destructive',
              )}
            />
            {errors.classes && <p className="text-xs text-destructive">{errors.classes}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="fdsbc-absences">
              <span className="text-blue-200">Faltas</span>
            </Label>
            <Input
              id="fdsbc-absences"
              type="text"
              inputMode="numeric"
              value={absences}
              onChange={handleAbsencesChange}
              placeholder="Ex: 10"
              className={cn(
                'bg-blue-800 border-blue-700 text-white placeholder-blue-400',
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
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold shadow-lg shadow-amber-900/30"
          />
          <ButtonComponent
            label="Limpar"
            onClick={handleReset}
            className="bg-blue-800 hover:bg-blue-700 text-blue-100 border-blue-700"
          />
        </div>

        {result && (
          <div className="rounded-lg border border-blue-700 p-4 space-y-2 bg-blue-800">
            <div className="flex items-center gap-2">
              {result.isOk ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
              <span className={cn('font-medium', result.isOk ? 'text-green-400' : 'text-red-400')}>
                {result.isOk ? 'Dentro do limite de faltas' : 'Limite de faltas excedido'}
              </span>
            </div>
            <p className="text-sm text-blue-200">
              Você ainda pode faltar em{' '}
              <strong className="text-blue-100">{result.missingAbsences}</strong> aula(s) sem
              reprovar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

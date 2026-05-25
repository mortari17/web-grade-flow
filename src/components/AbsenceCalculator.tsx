import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculateAbsence } from '@/lib/grade-calculator'
import { AlertCircle, CheckCircle2, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAbsenceCalculator } from '@/hooks/useAbsenceCalculator'

export function AbsenceCalculator() {
  const [absences, setAbsences] = useState('')
  const [classes, setClasses] = useState('80')
  const [result, setResult] = useState<{ missingAbsences: number; isOk: boolean } | null>(null)
  const [errors, setErrors] = useState({ absences: '', classes: '' })

  const {calculateDays, handleAbsencesChange} = useAbsenceCalculator({ setAbsences, classes })

  function validate(): boolean {
    const newErrors = { absences: '', classes: '' }
    const a = Number(absences)
    const c = Number(classes)

    if (!absences || a < 0) newErrors.absences = 'Digite um número inteiro maior do que 0'
    if (!classes || c <= 0) newErrors.classes = 'Selecione um valor válido'

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
    setClasses('80')
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
                <SelectItem value="80" className="text-white hover:bg-neutral-600">
                  80
                </SelectItem>
                <SelectItem value="160" className="text-white hover:bg-neutral-600">
                  160
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.classes && <p className="text-xs text-destructive">{errors.classes}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCalculate}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            Calcular
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-black/20 dark:border-white/20 text-white bg-neutral-700"
          >
            Limpar
          </Button>
        </div>

        {result && (
          <div
            className={cn(
              'rounded-lg border p-4 space-y-2 bg-neutral-700',
              result.isOk ? 'border-neutral-600' : 'border-neutral-600',
            )}
          >
            <div className="flex items-center gap-2">
              {result.isOk ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
              <span className={cn('font-medium', result.isOk ? 'text-green-400' : 'text-red-400')}>
                {result.isOk ? 'Dentro do limite' : 'Limite excedido'}
              </span>
            </div>
            <p className="text-sm text-neutral-300">
              Você ainda pode faltar em <strong>{result.missingAbsences}</strong> aula(s).
            </p>
            <p className="text-sm text-neutral-300">
              Isso significa que você pode faltar{' '}
              <strong>{calculateDays(result.missingAbsences).toFixed(1)}</strong> dia(s) sem
              reprovar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

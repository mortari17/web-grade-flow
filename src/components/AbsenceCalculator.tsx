import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateAbsence } from '@/lib/grade-calculator'
import { AlertCircle, CheckCircle2, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AbsenceCalculator() {
  const [absences, setAbsences] = useState('')
  const [classes, setClasses] = useState('')
  const [result, setResult] = useState<{ missingAbsences: number; isOk: boolean } | null>(null)
  const [errors, setErrors] = useState({ absences: '', classes: '' })

  function validate(): boolean {
    const newErrors = { absences: '', classes: '' }
    const a = Number(absences)
    const c = Number(classes)

    if (!absences || a < 0) newErrors.absences = 'Digite um número válido (>= 0)'
    if (!classes || c <= 0) newErrors.classes = 'Digite um número válido (> 0)'

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
        <CardTitle className="text-xl text-primary">Calculadora de Faltas</CardTitle>
        <CardDescription>
          Calcule quantas faltas ainda pode ter sem estourar o limite de 25%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="absences">
              <span className='text-primary'>
              Faltas
              </span>
              </Label>
            <Input
              id="absences"
              type="number"
              min={0}
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
              placeholder="0"
              className={cn(errors.absences && 'border-destructive', 'focus-visible:ring-primary')}
            />
            {errors.absences && <p className="text-xs text-destructive">{errors.absences}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="classes"><span className='text-primary'>
              Total de Aulas
              </span></Label>
            <Input
              id="classes"
              type="number"
              min={1}
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              placeholder="20"
              className={cn(errors.classes && 'border-destructive', 'focus-visible:ring-primary')}
            />
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
            className="border-black/20 dark:border-white/20"
          >
            Limpar
          </Button>
        </div>

        {result && (
          <div
            className={cn(
              'rounded-lg border p-4 space-y-2',
              result.isOk
                ? 'border-green-200 bg-green-50 dark:bg-green-950/20'
                : 'border-red-200 bg-red-50 dark:bg-red-950/20',
            )}
          >
            <div className="flex items-center gap-2">
              {result.isOk ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={cn('font-medium', result.isOk ? 'text-green-700' : 'text-red-700')}>
                {result.isOk ? 'Dentro do limite' : 'Limite excedido'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Você ainda pode faltar <strong>{result.missingAbsences}</strong> vez(es) sem reprovar.
            </p>
            <p className="text-sm text-muted-foreground">
              Isso significa que você pode faltar <strong>{result.missingAbsences / 2}</strong>{' '}
              dia(s) sem reprovar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

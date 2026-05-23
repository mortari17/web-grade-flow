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
import { SemesterGrades } from './SemesterGrade'
import { GradeResult } from './GradeResult'
import { calculateGrade } from '@/lib/grade-calculator'
import { GradeResponse } from '@/lib/types'
import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { handleChange } from '@/utils'
import { UI_MESSAGES } from '@/utils/constants'

type Period = 'semester' | 'year'

interface SemesterState {
  cp1: string
  cp2: string
  sprint1: string
  sprint2: string
  gs: string
}

const emptySemester: SemesterState = { cp1: '', cp2: '', sprint1: '', sprint2: '', gs: '' }

export function GradeCalculator() {
  const [period, setPeriod] = useState<Period>('semester')
  const [firstSemester, setFirstSemester] = useState<SemesterState>({ ...emptySemester })
  const [secondSemester, setSecondSemester] = useState<SemesterState>({ ...emptySemester })
  const [targetGrade, setTargetGrade] = useState('')
  const [result, setResult] = useState<GradeResponse | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleFirstChange(field: string, value: string) {
    setFirstSemester((prev) => ({ ...prev, [field]: value }))
  }

  function handleSecondChange(field: string, value: string) {
    setSecondSemester((prev) => ({ ...prev, [field]: value }))
  }

  function validateGrade(val: string): boolean {
    const trimmed = val.trim()

  const commaPattern = /^\d{1,2}(?:,\d{1,2})?$/
  const dotPattern = /^\d{1,2}(?:\.\d{1,2})?$/

  let normalized: string
  if (commaPattern.test(trimmed)) {
    normalized = trimmed.replace(',', '.')
  } else if (dotPattern.test(trimmed)) {
    normalized = trimmed
  } else {
    return true
  }

  
    const num = Number(normalized)
    return !isNaN(num) && num >= 0.01 && num <= 10.0
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}

    const s1 = firstSemester
    for (const key of ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs'] as const) {
      if (s1[key] && !validateGrade(s1[key])) {
        errs[key] = UI_MESSAGES.errorValidation
      }
    }

    if (period === 'year') {
      const s2 = secondSemester
      for (const key of ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs'] as const) {
        if (s2[key] && !validateGrade(s2[key])) {
          errs[`${key}_2`] = UI_MESSAGES.errorValidation
        }
      }
    }

    if (targetGrade) {
      if (!validateGrade(targetGrade)) {
        errs.target = UI_MESSAGES.errorValidation
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function toNumberOrUndefined(value: string): number | undefined {
  if (!value || value.trim() === '') {
    return undefined
  }

  const normalized = value.replace(/,/g, '.')
  const number = Number(normalized)

  if (isNaN(number)) {
    return undefined
  }

  return number
}

  function handleCalculate() {
    if (!validate()) return

    const res = calculateGrade({
      period,
      firstSemester: {
        cp1: toNumberOrUndefined(firstSemester.cp1),
        cp2: toNumberOrUndefined(firstSemester.cp2),
        sprint1: toNumberOrUndefined(firstSemester.sprint1),
        sprint2: toNumberOrUndefined(firstSemester.sprint2),
        gs: toNumberOrUndefined(firstSemester.gs),
      },
      secondSemester:
        period === 'year'
          ? {
              cp1: toNumberOrUndefined(secondSemester.cp1),
              cp2: toNumberOrUndefined(secondSemester.cp2),
              sprint1: toNumberOrUndefined(secondSemester.sprint1),
              sprint2: toNumberOrUndefined(secondSemester.sprint2),
              gs: toNumberOrUndefined(secondSemester.gs),
            }
          : undefined,
      targetGrade: toNumberOrUndefined(targetGrade),
    })

    setResult(res)
  }

  function handleReset() {
    setFirstSemester({ ...emptySemester })
    setSecondSemester({ ...emptySemester })
    setTargetGrade('')
    setResult(null)
    setErrors({})
  }

  if (result) {
    return (
      <Card className="border-t-4 border-t-primary shadow-lg bg-neutral-900">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              FIAP · Resultado
            </span>
          </div>
          <CardTitle className="text-xl text-primary">Resultado do Cálculo</CardTitle>
          <CardDescription>
            {period === 'semester' ? 'Cálculo por semestre' : 'Cálculo por ano'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeResult
            result={result}
            targetGrade={toNumberOrUndefined(targetGrade) || 6.0}
            onReset={handleReset}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-lg bg-neutral-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            FIAP · Notas
          </span>
        </div>
        <CardTitle className="text-xl text-neutral-300">Calculadora de Notas</CardTitle>
        <CardDescription>Calcule sua média ou quanto precisa tirar para passar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <Label>
            <div className="text-neutral-300">Período</div>
          </Label>
          <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
            <SelectTrigger className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border border-neutral-700 rounded-lg">
              <SelectItem value="semester" className="text-white hover:bg-neutral-700">
                Semestre
              </SelectItem>
              <SelectItem value="year" className="text-white hover:bg-neutral-700">
                Ano
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SemesterGrades
          prefix="s1"
          title="1º Semestre"
          grades={firstSemester}
          onChange={handleFirstChange}
          errors={errors}
          showGSDescription={period === 'semester'}
        />

        {period === 'year' && (
          <SemesterGrades
            prefix="s2"
            title="2º Semestre"
            grades={secondSemester}
            onChange={handleSecondChange}
            errors={errors}
            showGSDescription={period === 'year'}
          />
        )}

        <div className="space-y-1">
          <Label htmlFor="target">
            <div className="flex gap-1">
              <span className="text-neutral-300">Nota alvo</span>
              <span className="text-muted-foreground font-normal text-neutral-500">(opcional)</span>
            </div>
          </Label>
          <Input
            id="target"
            type="text"
            min={0.01}
            max={10}
            step={0.1}
            value={targetGrade}
            onChange={(e) => handleChange(e, setTargetGrade)}
            placeholder="6.00 (padrão FIAP)"
            className={cn(
              'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
              '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
            )}
          />
          {errors.target && <p className="text-xs text-destructive">{errors.target}</p>}
          <p className="text-xs text-muted-foreground text-neutral-500">
            Deixe em branco para usar a média mínima FIAP (6.0), ou informe uma nota específica
          </p>
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
      </CardContent>
    </Card>
  )
}

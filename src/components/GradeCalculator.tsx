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
    if (!val) return true
    const n = Number(val)
    return !isNaN(n) && n >= 0.01 && n <= 10.0
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}

    const s1 = firstSemester
    for (const key of ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs'] as const) {
      if (s1[key] && !validateGrade(s1[key])) {
        errs[key] = 'Valor entre 0.0 e 10.0'
      }
    }

    if (period === 'year') {
      const s2 = secondSemester
      for (const key of ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs'] as const) {
        if (s2[key] && !validateGrade(s2[key])) {
          errs[`${key}_2`] = 'Valor entre 0.0 e 10.0'
        }
      }
    }

    if (targetGrade) {
      const t = Number(targetGrade)
      if (isNaN(t) || t < 0.01 || t > 10.0) {
        errs.target = 'Valor entre 0.0 e 10.0'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function toNumberOrUndefined(val: string): number | undefined {
    return val ? Number(val) : undefined
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
      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              FIAP · Resultado
            </span>
          </div>
          <CardTitle className="text-xl">Resultado do Cálculo</CardTitle>
          <CardDescription>
            {period === 'semester' ? 'Cálculo por semestre' : 'Cálculo por ano'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeResult
            result={result}
            targetGrade={Number(targetGrade) || 6.0}
            onReset={handleReset}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            FIAP · Notas
          </span>
        </div>
        <CardTitle className="text-xl">Calculadora de Notas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <Label>Período</Label>
          <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
            <SelectTrigger className="focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SemesterGrades
          prefix="s1"
          title="1º Semestre"
          grades={firstSemester}
          onChange={handleFirstChange}
          errors={errors}
        />

        {period === 'year' && (
          <SemesterGrades
            prefix="s2"
            title="2º Semestre"
            grades={secondSemester}
            onChange={handleSecondChange}
            errors={errors}
          />
        )}

        <div className="space-y-1">
          <Label htmlFor="target">
            Nota alvo <span className="text-muted-foreground font-normal">(opcional)</span>
          </Label>
          <Input
            id="target"
            type="number"
            min={0.01}
            max={10}
            step={0.1}
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            placeholder="6.0 (padrão FIAP)"
            className={`focus-visible:ring-primary ${errors.target ? 'border-destructive' : ''}`}
          />
          {errors.target && <p className="text-xs text-destructive">{errors.target}</p>}
          <p className="text-xs text-muted-foreground">
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
            className="border-black/20 dark:border-white/20"
          >
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GradeInput } from '@/pages/fiap/components/GradeInput'
import { FdsbcGradeResult } from './GradeResult'
import { calculateFdsbcGrade } from '../utils/grade-calculator'
import { FdsbcGradeResult as FdsbcResult, FdsbcGradeState } from '../types'
import { Scale } from 'lucide-react'
import { validateGrade, toNumberOrUndefined } from '@/pages/fiap/utils'
import { ButtonComponent } from '@/components/Button'

const ERROR_MSG = 'Valor deve estar entre 0,0 e 10,0'

const emptyState: FdsbcGradeState = { p1: '', p2: '', p3: '', p4: '' }

const provas = [
  { key: 'p1' as const, label: '1ª Prova', id: 'fdsbc-p1', bimestre: 1 },
  { key: 'p2' as const, label: '2ª Prova', id: 'fdsbc-p2', bimestre: 1 },
  { key: 'p3' as const, label: '3ª Prova', id: 'fdsbc-p3', bimestre: 2 },
  { key: 'p4' as const, label: '4ª Prova', id: 'fdsbc-p4', bimestre: 2 },
]

export function FdsbcGradeCalculator() {
  const [grades, setGrades] = useState<FdsbcGradeState>({ ...emptyState })
  const [result, setResult] = useState<FdsbcResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(field: keyof FdsbcGradeState, value: string) {
    setGrades((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    for (const p of provas) {
      const v = grades[p.key]
      if (v && !validateGrade(v)) errs[p.key] = ERROR_MSG
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleCalculate() {
    if (!validate()) return
    const res = calculateFdsbcGrade({
      p1: toNumberOrUndefined(grades.p1),
      p2: toNumberOrUndefined(grades.p2),
      p3: toNumberOrUndefined(grades.p3),
      p4: toNumberOrUndefined(grades.p4),
    })
    setResult(res)
  }

  function handleReset() {
    setGrades({ ...emptyState })
    setResult(null)
    setErrors({})
  }

  if (result) {
    return (
      <Card className="border-t-4 border-t-amber-400 shadow-lg bg-blue-900">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-4 w-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              FDSBC · Resultado
            </span>
          </div>
          <CardTitle className="text-xl text-amber-400">Resultado do Cálculo</CardTitle>
          <CardDescription className="text-blue-300">
            Faculdade de Direito de São Bernardo do Campo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FdsbcGradeResult result={result} onReset={handleReset} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-t-4 border-t-amber-400 shadow-lg bg-blue-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Scale className="h-4 w-4 text-amber-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            FDSBC · Notas
          </span>
        </div>
        <CardTitle className="text-xl text-blue-100">Calculadora de Notas</CardTitle>
        <CardDescription className="text-blue-300">
          4 provas por ano · 2 por bimestre · pesos iguais · média mínima 7,0
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 rounded-full bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
              1º Bimestre
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {provas
              .filter((p) => p.bimestre === 1)
              .map((p) => (
                <GradeInput
                  key={p.key}
                  id={p.id}
                  label={p.label}
                  value={grades[p.key]}
                  onChange={(v) => handleChange(p.key, v)}
                  error={errors[p.key]}
                  inputClassName="bg-blue-800 border-blue-700 text-white placeholder-blue-400"
                  labelClassName="text-blue-200"
                />
              ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 rounded-full bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
              2º Bimestre
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {provas
              .filter((p) => p.bimestre === 2)
              .map((p) => (
                <GradeInput
                  key={p.key}
                  id={p.id}
                  label={p.label}
                  value={grades[p.key]}
                  onChange={(v) => handleChange(p.key, v)}
                  error={errors[p.key]}
                  inputClassName="bg-blue-800 border-blue-700 text-white placeholder-blue-400"
                  labelClassName="text-blue-200"
                />
              ))}
          </div>
        </div>

        <p className="text-xs text-blue-400">
          Deixe em branco as provas que ainda não aconteceram. O sistema calculará a nota necessária
          nas restantes.
        </p>

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
      </CardContent>
    </Card>
  )
}

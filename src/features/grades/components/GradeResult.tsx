import { AlertCircle, CheckCircle2, GraduationCap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { GradeResponse } from '../types'

interface GradeResultProps {
  result: GradeResponse
  targetGrade: number
  onReset: () => void
}

export function GradeResult({ result, targetGrade, onReset }: GradeResultProps) {
  const passed = result.hasPassedTheGrade
  const StatusIcon = passed ? CheckCircle2 : AlertCircle
  const statusColor = passed ? 'text-green-500' : 'text-red-500'

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-neutral-600 bg-neutral-700 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-600">
            <StatusIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className={cn('text-lg font-bold', statusColor)}>
              {passed ? 'Aprovado!' : 'Não passou'}
            </p>
            <p className="text-xs text-neutral-300">Média necessária: {targetGrade.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-baseline justify-center gap-2 py-3">
          <span className="text-sm text-neutral-300">Média final:</span>
          <span className={cn('text-4xl font-black tracking-tight', statusColor)}>
            {result.average.toFixed(2)}
          </span>
        </div>

        {result.requiredGs !== undefined && (
          <RequiredGs requiredGs={result.requiredGs} targetGrade={targetGrade} />
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="link" onClick={onReset} className="underline">
          <GraduationCap />
          Novo cálculo
        </Button>
      </div>
    </div>
  )
}

function RequiredGs({ requiredGs, targetGrade }: { requiredGs: number; targetGrade: number }) {
  const formatted = requiredGs.toFixed(2)

  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-600 bg-neutral-700 p-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-600 shrink-0">
        <Target className="h-4 w-4 text-neutral-300" />
      </div>
      <div>
        <span className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
          GS Necessária
        </span>
        <p className="text-sm text-neutral-300">
          Você {Number(formatted) > 10 ? 'precisaria' : 'precisa'} tirar{' '}
          <strong className="text-white text-lg">{formatted}</strong> na GS para atingir a média{' '}
          <strong>{targetGrade.toFixed(2)}</strong>.
        </p>
      </div>
    </div>
  )
}

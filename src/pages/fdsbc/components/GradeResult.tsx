import { type FdsbcGradeResult, FDSBC_AVERAGE } from '../types'
import { CheckCircle2, AlertCircle, Target, XCircle, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GradeResultProps {
  result: FdsbcGradeResult
  onReset: () => void
}

export function FdsbcGradeResult({ result, onReset }: GradeResultProps) {
  const allDone = result.remainingCount === 0

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-blue-700 bg-blue-800 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 shrink-0">
            {allDone ? (
              result.hasPassedTheGrade ? (
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-400" />
              )
            ) : result.isImpossible ? (
              <XCircle className="h-6 w-6 text-red-400" />
            ) : (
              <Target className="h-6 w-6 text-amber-400" />
            )}
          </div>
          <div>
            <p
              className={cn(
                'text-lg font-bold',
                allDone
                  ? result.hasPassedTheGrade
                    ? 'text-green-400'
                    : 'text-red-400'
                  : result.isImpossible
                    ? 'text-red-400'
                    : 'text-amber-400',
              )}
            >
              {allDone
                ? result.hasPassedTheGrade
                  ? 'Aprovado!'
                  : 'Reprovado'
                : result.isImpossible
                  ? 'Aprovação impossível'
                  : 'Em andamento'}
            </p>
            <p className="text-xs text-blue-300">Média mínima: {FDSBC_AVERAGE.toFixed(1)}</p>
          </div>
        </div>

        <div className="flex items-baseline justify-center gap-2 py-3">
          <span className="text-sm text-blue-300">
            {allDone ? 'Média final:' : 'Média parcial:'}
          </span>
          <span
            className={cn(
              'text-4xl font-black tracking-tight',
              allDone
                ? result.hasPassedTheGrade
                  ? 'text-green-400'
                  : 'text-red-400'
                : result.isImpossible
                  ? 'text-red-400'
                  : 'text-amber-400',
            )}
          >
            {result.currentAverage.toFixed(2)}
          </span>
        </div>

        {!allDone && result.requiredAverage !== undefined && (
          <div className="flex items-start gap-3 rounded-lg border border-blue-600 bg-blue-900 p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 shrink-0">
              <Target
                className={cn('h-4 w-4', result.isImpossible ? 'text-red-400' : 'text-amber-400')}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                {result.isImpossible ? 'Situação crítica' : 'Nota necessária'}
              </span>

              {result.isImpossible ? (
                <p className="text-sm text-blue-100">
                  Mesmo tirando <strong className="text-white">10,00</strong> em todas as{' '}
                  <strong className="text-white">{result.remainingCount}</strong> provas restantes,
                  não é possível atingir a média{' '}
                  <strong className="text-white">{FDSBC_AVERAGE.toFixed(1)}</strong>. Fale com a
                  coordenação.
                </p>
              ) : (
                <p className="text-sm text-blue-100">
                  Você precisa tirar em média{' '}
                  <strong className="text-amber-300 text-lg">
                    {result.requiredAverage.toFixed(2)}
                  </strong>{' '}
                  nas <strong className="text-white">{result.remainingCount}</strong>{' '}
                  {result.remainingCount === 1 ? 'prova restante' : 'provas restantes'} para atingir
                  a média <strong className="text-white">{FDSBC_AVERAGE.toFixed(1)}</strong>.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
        >
          <Scale className="h-4 w-4" />
          Novo cálculo
        </button>
      </div>
    </div>
  )
}

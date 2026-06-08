import { AbsenceResponse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { UI_MESSAGES } from '../utils/constants'

type AbsenceResultProps = {
  result: AbsenceResponse
  calculateDays: (missingAbsences: number) => number
}

export function AbsenceResult({ result, calculateDays }: AbsenceResultProps) {
  return (
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
          {result.isOk ? UI_MESSAGES.limitAttended : UI_MESSAGES.limitExceeded}
        </span>
      </div>
      <p className="text-sm text-neutral-300">
        Você ainda pode faltar em <strong>{result.missingAbsences}</strong> aula(s).
      </p>
      <p className="text-sm text-neutral-300">
        Isso significa que você pode faltar{' '}
        <strong>{Math.floor(calculateDays(result.missingAbsences))}</strong> dia(s) sem reprovar.
      </p>
    </div>
  )
}

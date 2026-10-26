import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ABSENCE_MESSAGES } from '../constants'
import type { AbsenceResponse } from '../types'

interface AbsenceResultProps {
  result: AbsenceResponse
}

export function AbsenceResult({ result }: AbsenceResultProps) {
  const StatusIcon = result.isOk ? CheckCircle2 : AlertCircle
  const statusColor = result.isOk ? 'text-green-400' : 'text-red-400'

  return (
    <div className="rounded-lg border border-neutral-600 p-4 space-y-2 bg-neutral-700">
      <div className="flex items-center gap-2">
        <StatusIcon className={cn('h-5 w-5', statusColor)} />
        <span className={cn('font-medium', statusColor)}>
          {result.isOk ? ABSENCE_MESSAGES.limitAttended : ABSENCE_MESSAGES.limitExceeded}
        </span>
      </div>
      <p className="text-sm text-neutral-300">
        Você ainda pode faltar em <strong>{result.missingAbsences}</strong> aula(s).
      </p>
      <p className="text-sm text-neutral-300">
        Isso significa que você pode faltar <strong>{result.missingDays}</strong> dia(s) sem
        reprovar.
      </p>
    </div>
  )
}

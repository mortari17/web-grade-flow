import { AbsenceResponse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { UI_MESSAGES } from '../utils/constants'

export function AbsenceResult({ result }: { result: AbsenceResponse }) {
  return (
    <div className="rounded-lg border border-neutral-600 p-4 space-y-2 bg-neutral-700">
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
        Você ainda pode faltar em <strong>{result.missingAbsences}</strong> aula(s) sem reprovar.
      </p>
    </div>
  )
}

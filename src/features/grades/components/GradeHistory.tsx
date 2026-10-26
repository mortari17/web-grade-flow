import { History, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { EnumPeriod, type GradeHistoryEntry } from '../types'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

interface GradeHistoryProps {
  entries: GradeHistoryEntry[]
  onSelect: (entry: GradeHistoryEntry) => void
  onClear: () => void
}

export function GradeHistory({ entries, onSelect, onClear }: GradeHistoryProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader className="flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-neutral-300">
          <History className="h-4 w-4 text-primary" />
          Últimos cálculos
        </CardTitle>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 px-2 text-xs text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
          >
            <Trash2 />
            Limpar
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2 p-4 pt-2">
        {entries.length === 0 ? (
          <p className="text-xs text-neutral-500">
            Seus cálculos aparecerão aqui. Clique em um deles para preencher o formulário.
          </p>
        ) : (
          entries.map((entry) => (
            <HistoryItem key={entry.id} entry={entry} onSelect={() => onSelect(entry)} />
          ))
        )}
      </CardContent>
    </Card>
  )
}

function HistoryItem({ entry, onSelect }: { entry: GradeHistoryEntry; onSelect: () => void }) {
  const { result } = entry
  const passed = result.hasPassedTheGrade

  return (
    <Button
      variant="outline"
      onClick={onSelect}
      title="Preencher o formulário com este cálculo"
      className="h-auto w-full flex-col items-stretch gap-1 border-neutral-700 bg-neutral-800 p-3 text-left hover:bg-neutral-700 hover:text-white"
    >
      <span className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-400">
        <span className="font-bold text-primary">
          {entry.period === EnumPeriod.YEAR ? 'Ano' : 'Semestre'}
        </span>
        {dateFormatter.format(entry.createdAt)}
      </span>
      <span className="flex items-baseline justify-between">
        <span className={cn('text-2xl font-black', passed ? 'text-green-500' : 'text-red-500')}>
          {result.average.toFixed(2)}
        </span>
        <span className="text-xs text-neutral-400">alvo {entry.effectiveTarget.toFixed(2)}</span>
      </span>
      {result.requiredGs !== undefined && (
        <span className="text-xs font-normal text-neutral-300">
          GS necessária: <strong>{result.requiredGs.toFixed(2)}</strong>
        </span>
      )}
    </Button>
  )
}

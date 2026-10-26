import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { GradeFormValues, GradeHistoryEntry, GradeResponse } from '../types'

const STORAGE_KEY = 'gradeflow:grade-history:v1'
const MAX_ENTRIES = 6

function parseHistory(raw: unknown): GradeHistoryEntry[] {
  if (!Array.isArray(raw)) return []
  return raw.filter(
    (entry): entry is GradeHistoryEntry =>
      typeof entry?.id === 'string' &&
      typeof entry?.createdAt === 'number' &&
      typeof entry?.result?.average === 'number' &&
      typeof entry?.firstSemester === 'object',
  )
}

function sameValues(a: GradeFormValues, b: GradeFormValues): boolean {
  return (
    a.period === b.period &&
    a.targetGrade === b.targetGrade &&
    JSON.stringify(a.firstSemester) === JSON.stringify(b.firstSemester) &&
    JSON.stringify(a.secondSemester) === JSON.stringify(b.secondSemester)
  )
}

/** Últimos cálculos de nota, salvos no navegador do usuário. Mais recente primeiro. */
export function useGradeHistory() {
  const [entries, setEntries] = useLocalStorage<GradeHistoryEntry[]>(STORAGE_KEY, [], parseHistory)

  function add(values: GradeFormValues, result: GradeResponse, effectiveTarget: number) {
    const entry: GradeHistoryEntry = {
      ...values,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      result,
      effectiveTarget,
    }
    // Recalcular os mesmos valores só move o cálculo para o topo.
    setEntries((prev) =>
      [entry, ...prev.filter((e) => !sameValues(e, values))].slice(0, MAX_ENTRIES),
    )
  }

  function clear() {
    setEntries([])
  }

  return { entries, add, clear }
}

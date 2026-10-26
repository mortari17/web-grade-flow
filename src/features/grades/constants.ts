import type { SelectOption } from '@/components/shared/SelectField'
import { ZERO_GRADE } from './lib/grade-input'
import { EnumPeriod, type GradeField, type SemesterForm } from './types'

// GS começa vazia: é o que dispara o cálculo da GS necessária.
export const EMPTY_SEMESTER: SemesterForm = {
  cp1: ZERO_GRADE,
  cp2: ZERO_GRADE,
  sprint1: ZERO_GRADE,
  sprint2: ZERO_GRADE,
  average: ZERO_GRADE,
  gs: '',
  useAverage: false,
}

export const GRADE_LABELS: Record<GradeField, string> = {
  cp1: 'CP1',
  cp2: 'CP2',
  sprint1: 'Sprint 1',
  sprint2: 'Sprint 2',
  average: 'Média (CPs e Sprints)',
  gs: 'GS',
}

export const PERIOD_OPTIONS: SelectOption<EnumPeriod>[] = [
  { value: EnumPeriod.SEMESTER, label: 'Semestre' },
  { value: EnumPeriod.YEAR, label: 'Ano' },
]

export const GRADE_MESSAGES = {
  invalidGrade: 'Valor deve estar entre 0,00 e 10,00',
  gsHint:
    'Caso não tenha essa nota, deixe em branco e vamos calcular quanto você precisa tirar para atingir a nota alvo!',
}

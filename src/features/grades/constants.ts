import type { SelectOption } from '@/components/shared/SelectField'
import { EnumPeriod, type GradeField, type SemesterForm } from './types'

export const EMPTY_SEMESTER: SemesterForm = { cp1: '', cp2: '', sprint1: '', sprint2: '', gs: '' }

export const GRADE_LABELS: Record<GradeField, string> = {
  cp1: 'CP1',
  cp2: 'CP2',
  sprint1: 'Sprint 1',
  sprint2: 'Sprint 2',
  gs: 'GS',
}

export const PERIOD_OPTIONS: SelectOption<EnumPeriod>[] = [
  { value: EnumPeriod.SEMESTER, label: 'Semestre' },
  { value: EnumPeriod.YEAR, label: 'Ano' },
]

export const GRADE_MESSAGES = {
  invalidGrade: 'Valor deve estar entre 0.0 e 10.0',
  gsHint:
    'Caso não tenha essa nota, deixe em branco e vamos calcular quanto você precisa tirar para atingir a nota alvo!',
}

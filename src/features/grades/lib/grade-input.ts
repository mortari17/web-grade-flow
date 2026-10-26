import { PARTIAL_GRADE_FIELDS, type GradeField, type Semester, type SemesterForm } from '../types'

export const ZERO_GRADE = '0,00'
const MAX_GRADE_CENTS = 1000

export function formatGrade(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',')
}

// Dígitos entram pela direita: 1 → 0,01, 10 → 0,10, 100 → 1,00. Acima de 10,00 é ignorado.
export function maskGradeInput(raw: string, previous: string, allowEmpty = false): string {
  const cents = Number(raw.replace(/\D/g, '') || '0')

  if (cents > MAX_GRADE_CENTS) return previous
  if (allowEmpty && cents === 0 && raw.length < previous.length) return ''

  return formatGrade(cents)
}

export function toNumberOrUndefined(value: string): number | undefined {
  if (!value || value.trim() === '') {
    return undefined
  }

  const number = Number(value.replace(/,/g, '.'))
  return isNaN(number) ? undefined : number
}

export function validateGrade(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false

  if (!/^\d{1,2}(?:[.,]\d{0,2})?$/.test(trimmed)) {
    return false
  }

  const num = Number(trimmed.replace(',', '.'))
  return !isNaN(num) && num >= 0 && num <= 10.0
}

export function activeGradeFields(form: SemesterForm): GradeField[] {
  return form.useAverage ? ['average', 'gs'] : [...PARTIAL_GRADE_FIELDS, 'gs']
}

export function parseSemester(form: SemesterForm): Semester {
  return Object.fromEntries(
    activeGradeFields(form).map((field) => [field, toNumberOrUndefined(form[field])]),
  ) as Semester
}

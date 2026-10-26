import { GRADE_FIELDS, type Semester, type SemesterForm } from '../types'

/** Mantém apenas dígitos e vírgula, limitando ao formato "10" ou "9,75". */
export function sanitizeGradeInput(raw: string): string {
  let filtered = raw.replace(/[^0-9,]/g, '')

  if (filtered.startsWith(',')) {
    filtered = filtered.slice(1)
  }

  return filtered.includes(',') ? filtered.slice(0, 4) : filtered.slice(0, 2)
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
  return !isNaN(num) && num >= 0.01 && num <= 10.0
}

export function parseSemester(form: SemesterForm): Semester {
  return Object.fromEntries(
    GRADE_FIELDS.map((field) => [field, toNumberOrUndefined(form[field])]),
  ) as Semester
}

export enum EnumPeriod {
  SEMESTER = 'semester',
  YEAR = 'year',
}

export const GRADE_FIELDS = ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs'] as const
export type GradeField = (typeof GRADE_FIELDS)[number]

export type Semester = Partial<Record<GradeField, number>>

/** Valores digitados no formulário (string para permitir campos vazios e vírgula). */
export type SemesterForm = Record<GradeField, string>
export type SemesterErrors = Partial<Record<GradeField, string>>

export interface GradeFormErrors {
  firstSemester: SemesterErrors
  secondSemester: SemesterErrors
  targetGrade?: string
}

export interface GradeRequest {
  period: EnumPeriod
  firstSemester: Semester
  secondSemester?: Semester
  targetGrade?: number
}

export interface GradeResponse {
  average: number
  hasPassedTheGrade: boolean
  requiredGs?: number
}

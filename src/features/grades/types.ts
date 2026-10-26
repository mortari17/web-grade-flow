export enum EnumPeriod {
  SEMESTER = 'semester',
  YEAR = 'year',
}

export const PARTIAL_GRADE_FIELDS = ['cp1', 'cp2', 'sprint1', 'sprint2'] as const
export const GRADE_FIELDS = [...PARTIAL_GRADE_FIELDS, 'average', 'gs'] as const
export type GradeField = (typeof GRADE_FIELDS)[number]

export type Semester = Partial<Record<GradeField, number>>

export type SemesterForm = Record<GradeField, string> & { useAverage: boolean }
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

export interface GradeFormValues {
  period: EnumPeriod
  firstSemester: SemesterForm
  secondSemester: SemesterForm
  targetGrade: string
}

export interface GradeHistoryEntry extends GradeFormValues {
  id: string
  createdAt: number
  result: GradeResponse
  effectiveTarget: number
}

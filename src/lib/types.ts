export interface Semester {
  cp1?: number
  cp2?: number
  sprint1?: number
  sprint2?: number
  gs?: number
}

export interface GradeRequest {
  period: 'semester' | 'year'
  firstSemester: Semester
  secondSemester?: Semester
  targetGrade?: number
}

export interface GradeResponse {
  average: number
  hasPassedTheGrade: boolean
  requiredGs?: number
}

export interface AbsenceRequest {
  absences: number
  classes: number
}

export interface AbsenceResponse {
  missingAbsences: number
  isOk: boolean
}
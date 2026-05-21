import { Semester, GradeRequest, GradeResponse, AbsenceRequest, AbsenceResponse } from './types'

const MAX_MISSING_PR = 0.25
const CPS_AND_SPRINTS_WEIGHT = 0.4
const GS_WEIGHT = 0.6
const NUMBER_OF_SEMESTER_GRADES = 4
const FIRST_SEMESTER_WEIGHT = 0.4
const SECOND_SEMESTER_WEIGHT = 0.6
const FIAP_AVERAGE = 6.0
const ZERO = 0

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}

export function calculateAbsence(data: AbsenceRequest): AbsenceResponse {
  const maxAbsencesAllowed = Math.floor(data.classes * MAX_MISSING_PR)
  const remaining = Math.max(ZERO, maxAbsencesAllowed - data.absences)

  return {
    missingAbsences: remaining,
    isOk: data.absences <= maxAbsencesAllowed,
  }
}

function validateGrades(s: Semester): Record<string, boolean> {
  return {
    cp1: s.cp1 !== undefined && s.cp1 !== null,
    cp2: s.cp2 !== undefined && s.cp2 !== null,
    sprint1: s.sprint1 !== undefined && s.sprint1 !== null,
    sprint2: s.sprint2 !== undefined && s.sprint2 !== null,
    gs: s.gs !== undefined && s.gs !== null,
  }
}

function normalizeMissingGrades(s: Semester, validator: Record<string, boolean>): void {
  const fields: Array<keyof Semester> = ['cp1', 'cp2', 'sprint1', 'sprint2', 'gs']
  for (const field of fields) {
    if (!validator[field]) {
      (s as any)[field] = ZERO
    }
  }
}

function calculateSemesterGrade(data: Semester, target: number): GradeResponse {
  const validator = validateGrades(data)
  normalizeMissingGrades(data, validator)

  const semesterCpsAndSprints =
    (data.cp1! + data.cp2! + data.sprint1! + data.sprint2!) / NUMBER_OF_SEMESTER_GRADES

  const cpsContribution = semesterCpsAndSprints * CPS_AND_SPRINTS_WEIGHT
  const finalGrade = cpsContribution + (data.gs! * GS_WEIGHT)
  const rounded = round2(finalGrade)

  let requiredGs: number | undefined
  if (!validator.gs) {
    const gs = round2((target - cpsContribution) / GS_WEIGHT)
    requiredGs = gs
  }

  return {
    average: rounded,
    hasPassedTheGrade: rounded >= target,
    requiredGs,
  }
}

function calculateYearGrade(data: GradeRequest, target: number): GradeResponse {
  const validator = validateGrades(data.secondSemester!)
  const hasGs = validator.gs

  const first = calculateSemesterGrade(data.firstSemester, target)
  const second = calculateSemesterGrade(data.secondSemester!, target)

  const yearFinal =
    first.average * FIRST_SEMESTER_WEIGHT +
    second.average * SECOND_SEMESTER_WEIGHT

  const rounded = round2(yearFinal)

  let requiredGs: number | undefined
  if (!hasGs) {
    const semesterCps =
      (data.secondSemester!.cp1! +
        data.secondSemester!.cp2! +
        data.secondSemester!.sprint1! +
        data.secondSemester!.sprint2!) / NUMBER_OF_SEMESTER_GRADES

    const cpsContribution = semesterCps * CPS_AND_SPRINTS_WEIGHT

    const numerator =
      target -
      first.average * FIRST_SEMESTER_WEIGHT -
      cpsContribution * SECOND_SEMESTER_WEIGHT

    const denominator = GS_WEIGHT * SECOND_SEMESTER_WEIGHT

    requiredGs = round2(numerator / denominator)
  }

  return {
    average: rounded,
    hasPassedTheGrade: rounded >= target,
    requiredGs,
  }
}

export function calculateGrade(data: GradeRequest): GradeResponse {
  const target = data.targetGrade ?? FIAP_AVERAGE

  switch (data.period) {
    case 'semester':
      return calculateSemesterGrade(data.firstSemester, target)
    case 'year':
      return calculateYearGrade(data, target)
  }
}
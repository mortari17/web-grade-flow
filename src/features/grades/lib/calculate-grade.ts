import {
  CPS_AND_SPRINTS_WEIGHT,
  FIAP_AVERAGE,
  FIRST_SEMESTER_WEIGHT,
  GS_WEIGHT,
  SECOND_SEMESTER_WEIGHT,
} from '@/config/fiap'
import { EnumPeriod, type GradeRequest, type GradeResponse, type Semester } from '../types'

const PARTIAL_GRADES_COUNT = 4

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function partialGradesContribution(s: Semester): number {
  const average =
    s.average ??
    ((s.cp1 ?? 0) + (s.cp2 ?? 0) + (s.sprint1 ?? 0) + (s.sprint2 ?? 0)) / PARTIAL_GRADES_COUNT
  return average * CPS_AND_SPRINTS_WEIGHT
}

export function calculateSemesterGrade(semester: Semester, target: number): GradeResponse {
  const partials = partialGradesContribution(semester)
  const average = round2(partials + (semester.gs ?? 0) * GS_WEIGHT)

  return {
    average,
    hasPassedTheGrade: average >= FIAP_AVERAGE,
    requiredGs: semester.gs === undefined ? round2((target - partials) / GS_WEIGHT) : undefined,
  }
}

export function calculateYearGrade(
  firstSemester: Semester,
  secondSemester: Semester,
  target: number,
): GradeResponse {
  const first = calculateSemesterGrade(firstSemester, target)
  const second = calculateSemesterGrade(secondSemester, target)
  const average = round2(
    first.average * FIRST_SEMESTER_WEIGHT + second.average * SECOND_SEMESTER_WEIGHT,
  )

  let requiredGs: number | undefined
  if (secondSemester.gs === undefined) {
    const numerator =
      target -
      first.average * FIRST_SEMESTER_WEIGHT -
      partialGradesContribution(secondSemester) * SECOND_SEMESTER_WEIGHT
    requiredGs = numerator / (GS_WEIGHT * SECOND_SEMESTER_WEIGHT)
  }

  return {
    average,
    hasPassedTheGrade: average >= FIAP_AVERAGE,
    requiredGs,
  }
}

export function calculateGrade(data: GradeRequest): GradeResponse {
  const target = data.targetGrade ?? FIAP_AVERAGE

  switch (data.period) {
    case EnumPeriod.SEMESTER:
      return calculateSemesterGrade(data.firstSemester, target)
    case EnumPeriod.YEAR:
      return calculateYearGrade(data.firstSemester, data.secondSemester ?? {}, target)
    default:
      throw new Error('Invalid period')
  }
}

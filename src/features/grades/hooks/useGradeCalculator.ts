import { useState } from 'react'
import { FIAP_AVERAGE } from '@/config/fiap'
import { EMPTY_SEMESTER, GRADE_MESSAGES } from '../constants'
import { calculateGrade } from '../lib/calculate-grade'
import { parseSemester, toNumberOrUndefined, validateGrade } from '../lib/grade-input'
import {
  EnumPeriod,
  GRADE_FIELDS,
  type GradeField,
  type GradeFormErrors,
  type GradeResponse,
  type SemesterErrors,
  type SemesterForm,
} from '../types'

const EMPTY_ERRORS: GradeFormErrors = { firstSemester: {}, secondSemester: {} }

function validateSemester(form: SemesterForm): SemesterErrors {
  const errors: SemesterErrors = {}
  for (const field of GRADE_FIELDS) {
    if (form[field] && !validateGrade(form[field])) {
      errors[field] = GRADE_MESSAGES.invalidGrade
    }
  }
  return errors
}

function hasErrors(errors: GradeFormErrors): boolean {
  return (
    Object.keys(errors.firstSemester).length > 0 ||
    Object.keys(errors.secondSemester).length > 0 ||
    Boolean(errors.targetGrade)
  )
}

export function useGradeCalculator() {
  const [period, setPeriod] = useState<EnumPeriod>(EnumPeriod.SEMESTER)
  const [firstSemester, setFirstSemester] = useState<SemesterForm>(EMPTY_SEMESTER)
  const [secondSemester, setSecondSemester] = useState<SemesterForm>(EMPTY_SEMESTER)
  const [targetGrade, setTargetGrade] = useState('')
  const [result, setResult] = useState<GradeResponse | null>(null)
  const [errors, setErrors] = useState<GradeFormErrors>(EMPTY_ERRORS)

  const isYear = period === EnumPeriod.YEAR

  function updateFirstSemester(field: GradeField, value: string) {
    setFirstSemester((prev) => ({ ...prev, [field]: value }))
  }

  function updateSecondSemester(field: GradeField, value: string) {
    setSecondSemester((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): boolean {
    const newErrors: GradeFormErrors = {
      firstSemester: validateSemester(firstSemester),
      secondSemester: isYear ? validateSemester(secondSemester) : {},
      targetGrade:
        targetGrade && !validateGrade(targetGrade) ? GRADE_MESSAGES.invalidGrade : undefined,
    }

    setErrors(newErrors)
    return !hasErrors(newErrors)
  }

  function calculate() {
    if (!validate()) return

    setResult(
      calculateGrade({
        period,
        firstSemester: parseSemester(firstSemester),
        secondSemester: isYear ? parseSemester(secondSemester) : undefined,
        targetGrade: toNumberOrUndefined(targetGrade),
      }),
    )
  }

  function reset() {
    setFirstSemester(EMPTY_SEMESTER)
    setSecondSemester(EMPTY_SEMESTER)
    setTargetGrade('')
    setResult(null)
    setErrors(EMPTY_ERRORS)
  }

  return {
    period,
    isYear,
    firstSemester,
    secondSemester,
    targetGrade,
    effectiveTarget: toNumberOrUndefined(targetGrade) || FIAP_AVERAGE,
    result,
    errors,
    setPeriod,
    setTargetGrade,
    updateFirstSemester,
    updateSecondSemester,
    calculate,
    reset,
  }
}

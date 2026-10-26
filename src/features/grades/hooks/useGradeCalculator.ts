import { useState } from 'react'
import { FIAP_AVERAGE } from '@/config/fiap'
import { EMPTY_SEMESTER, GRADE_MESSAGES } from '../constants'
import { calculateGrade } from '../lib/calculate-grade'
import {
  activeGradeFields,
  parseSemester,
  toNumberOrUndefined,
  validateGrade,
} from '../lib/grade-input'
import {
  EnumPeriod,
  type GradeFormErrors,
  type GradeFormValues,
  type GradeResponse,
  type SemesterErrors,
  type SemesterForm,
} from '../types'

const EMPTY_ERRORS: GradeFormErrors = { firstSemester: {}, secondSemester: {} }

function validateSemester(form: SemesterForm): SemesterErrors {
  const errors: SemesterErrors = {}
  for (const field of activeGradeFields(form)) {
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

interface UseGradeCalculatorOptions {
  onCalculated?: (values: GradeFormValues, result: GradeResponse, effectiveTarget: number) => void
}

export function useGradeCalculator({ onCalculated }: UseGradeCalculatorOptions = {}) {
  const [period, setPeriod] = useState<EnumPeriod>(EnumPeriod.SEMESTER)
  const [firstSemester, setFirstSemester] = useState<SemesterForm>(EMPTY_SEMESTER)
  const [secondSemester, setSecondSemester] = useState<SemesterForm>(EMPTY_SEMESTER)
  const [targetGrade, setTargetGrade] = useState('')
  const [result, setResult] = useState<GradeResponse | null>(null)
  const [errors, setErrors] = useState<GradeFormErrors>(EMPTY_ERRORS)

  const isYear = period === EnumPeriod.YEAR
  const effectiveTarget = toNumberOrUndefined(targetGrade) || FIAP_AVERAGE

  function updateFirstSemester(changes: Partial<SemesterForm>) {
    setFirstSemester((prev) => ({ ...prev, ...changes }))
  }

  function updateSecondSemester(changes: Partial<SemesterForm>) {
    setSecondSemester((prev) => ({ ...prev, ...changes }))
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

    const newResult = calculateGrade({
      period,
      firstSemester: parseSemester(firstSemester),
      secondSemester: isYear ? parseSemester(secondSemester) : undefined,
      targetGrade: toNumberOrUndefined(targetGrade),
    })

    setResult(newResult)
    onCalculated?.(
      { period, firstSemester, secondSemester, targetGrade },
      newResult,
      effectiveTarget,
    )
  }

  function load(values: GradeFormValues) {
    setPeriod(values.period)
    setFirstSemester({ ...EMPTY_SEMESTER, ...values.firstSemester })
    setSecondSemester({ ...EMPTY_SEMESTER, ...values.secondSemester })
    setTargetGrade(values.targetGrade)
    setResult(null)
    setErrors(EMPTY_ERRORS)
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
    effectiveTarget,
    result,
    errors,
    setPeriod,
    setTargetGrade,
    updateFirstSemester,
    updateSecondSemester,
    calculate,
    load,
    reset,
  }
}

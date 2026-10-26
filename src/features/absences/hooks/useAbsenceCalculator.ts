import { useState } from 'react'
import { ABSENCE_MESSAGES } from '../constants'
import { calculateAbsence } from '../lib/calculate-absence'
import { EnumClasses, type AbsenceFormErrors, type AbsenceResponse } from '../types'

const MAX_ABSENCES_DIGITS = 3

export function useAbsenceCalculator() {
  const [absences, setAbsencesValue] = useState('')
  const [classes, setClasses] = useState<EnumClasses>(EnumClasses.CLASSES_80)
  const [result, setResult] = useState<AbsenceResponse | null>(null)
  const [errors, setErrors] = useState<AbsenceFormErrors>({})

  function setAbsences(raw: string) {
    setAbsencesValue(raw.replace(/[^0-9]/g, '').slice(0, MAX_ABSENCES_DIGITS))
  }

  function validate(): boolean {
    const newErrors: AbsenceFormErrors = {}

    if (!absences || Number(absences) < 0) newErrors.absences = ABSENCE_MESSAGES.invalidAbsences
    if (!classes || Number(classes) <= 0) newErrors.classes = ABSENCE_MESSAGES.invalidClasses

    setErrors(newErrors)
    return !newErrors.absences && !newErrors.classes
  }

  function calculate() {
    if (!validate()) return
    setResult(calculateAbsence({ absences: Number(absences), classes: Number(classes) }))
  }

  function reset() {
    setAbsencesValue('')
    setClasses(EnumClasses.CLASSES_80)
    setResult(null)
    setErrors({})
  }

  return {
    absences,
    classes,
    result,
    errors,
    maxAbsencesDigits: MAX_ABSENCES_DIGITS,
    setAbsences,
    setClasses,
    calculate,
    reset,
  }
}

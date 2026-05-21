import { calculateAbsence } from '@/lib/grade-calculator'
import { useState, useCallback } from 'react'

interface UseAbsenceCalculatorReturn {
  absences: number
  classes: number
  setAbsences: (value: number) => void
  setClasses: (value: number) => void
  reset: () => void
  missingAbsences: number
  isOk: boolean
}

export function useAbsenceCalculator(): UseAbsenceCalculatorReturn {
  const [absences, setAbsencesState] = useState<number>(0)
  const [classes, setClassesState] = useState<number>(0)

  const setAbsences = useCallback((value: number) => {
    if (value >= 0) {
      setAbsencesState(value)
    }
  }, [])

  const setClasses = useCallback((value: number) => {
    if (value >= 0) {
      setClassesState(value)
    }
  }, [])

  const reset = useCallback(() => {
    setAbsencesState(0)
    setClassesState(0)
  }, [])

  const { missingAbsences, isOk } = calculateAbsence({ absences, classes })

  return {
    absences,
    classes,
    setAbsences,
    setClasses,
    reset,
    missingAbsences,
    isOk,
  }
}

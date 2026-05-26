import { ChangeEvent, SetStateAction } from 'react'
import { EnumClasses } from '../types'

interface UseAbsenceCalculatorReturn {
  handleAbsencesChange: (e: ChangeEvent<HTMLInputElement>) => void
  calculateDays: (missingAbsences: number) => number
}

type useAbsenceCalculatorRequest = {
  setAbsences: (value: SetStateAction<string>) => void
  classes: EnumClasses | string
}

export function useAbsenceCalculator({
  setAbsences,
  classes,
}: useAbsenceCalculatorRequest): UseAbsenceCalculatorReturn {
  const handleAbsencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3)
    setAbsences(value)
  }

  const calculateDays = (missingAbsences: number): number => {
    if (classes === EnumClasses.CLASSES_80) return missingAbsences / 2
    if (classes === EnumClasses.CLASSES_160) return missingAbsences / 4
    return 0
  }

  return {
    handleAbsencesChange,
    calculateDays,
  }
}

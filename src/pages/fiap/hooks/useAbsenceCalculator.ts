import { ChangeEvent, SetStateAction } from 'react'

interface UseAbsenceCalculatorReturn {
  handleAbsencesChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClassesChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type UseAbsenceCalculatorRequest = {
  setAbsences: (value: SetStateAction<string>) => void
  setClasses: (value: SetStateAction<string>) => void
}

export function useAbsenceCalculator({
  setAbsences,
  setClasses,
}: UseAbsenceCalculatorRequest): UseAbsenceCalculatorReturn {
  const handleAbsencesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAbsences(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))
  }

  const handleClassesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClasses(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))
  }

  return { handleAbsencesChange, handleClassesChange }
}

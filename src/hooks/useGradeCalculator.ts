/* eslint-disable no-useless-assignment */
import { useState, useCallback } from 'react'
import { calculateSemesterGrade, calculateYearGrade } from '@/lib/grade-calculator'
import type { Semester, GradeResponse } from '@/lib/types'

interface SemesterGrades {
  cp1?: number | null
  cp2?: number | null
  sprint1?: number | null
  sprint2?: number | null
  gs?: number | null
}

interface State {
  period: 'semester' | 'year'
  firstSemester: SemesterGrades
  secondSemester: SemesterGrades
  targetGrade: number
}

type UpdateGradeFn = (
  semester: 'first' | 'second',
  gradeType: keyof SemesterGrades,
  value: number | null,
) => void

interface Return {
  state: State
  updateGrade: UpdateGradeFn
  setTargetGrade: (value: number) => void
  setPeriod: (value: 'semester' | 'year') => void
  reset: () => void
  result: {
    firstSemester: GradeResponse | null
    secondSemester: GradeResponse | null
    year: GradeResponse | null
    status: 'approved' | 'reprovado' | 'indefinido' | null
  }
}

const initialState: State = {
  period: 'semester',
  firstSemester: {},
  secondSemester: {},
  targetGrade: 6.0,
}

function toSemester(grades: SemesterGrades): Semester {
  return {
    cp1: grades.cp1 ?? undefined,
    cp2: grades.cp2 ?? undefined,
    sprint1: grades.sprint1 ?? undefined,
    sprint2: grades.sprint2 ?? undefined,
    gs: grades.gs ?? undefined,
  }
}

export function useGradeCalculator(): Return {
  const [state, setState] = useState<State>(initialState)

  const updateGrade = useCallback<UpdateGradeFn>((semester, gradeType, value) => {
    if (value !== null && (value < 0 || value > 10)) return

    setState((prev) => ({
      ...prev,
      [semester === 'first' ? 'firstSemester' : 'secondSemester']: {
        ...prev[semester === 'first' ? 'firstSemester' : 'secondSemester'],
        [gradeType]: value,
      },
    }))
  }, [])

  const setTargetGrade = useCallback((value: number) => {
    if (value >= 0 && value <= 10) {
      setState((prev) => ({ ...prev, targetGrade: value }))
    }
  }, [])

  const setPeriod = useCallback((value: 'semester' | 'year') => {
    setState((prev) => ({ ...prev, period: value }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  const target = state.targetGrade

  const firstSemesterGrade = calculateSemesterGrade(toSemester(state.firstSemester), target)

  const secondSemesterGrade =
    state.period === 'year'
      ? calculateSemesterGrade(toSemester(state.secondSemester), target)
      : null

  const yearGrade =
    state.period === 'year'
      ? calculateYearGrade(
          {
            period: 'year',
            firstSemester: toSemester(state.firstSemester),
            secondSemester: toSemester(state.secondSemester),
            targetGrade: target,
          },
          target,
        )
      : firstSemesterGrade

  let status: 'approved' | 'reprovado' | 'indefinido' | null = null
  if (yearGrade) {
    status = yearGrade.hasPassedTheGrade ? 'approved' : 'reprovado'
  } else {
    status = 'indefinido'
  }

  return {
    state,
    updateGrade,
    setTargetGrade,
    setPeriod,
    reset,
    result: {
      firstSemester: firstSemesterGrade,
      secondSemester: secondSemesterGrade,
      year: yearGrade,
      status,
    },
  }
}

import { useState, useCallback } from 'react';
import { calculateSemesterGrade, calculateYearGrade } from '../utils/calculations';

interface SemesterGrades {
  cp1?: number | null;
  cp2?: number | null;
  sprint1?: number | null;
  sprint2?: number | null;
  gs?: number | null;
}

interface State {
  period: 'semester' | 'year';
  firstSemester: SemesterGrades;
  secondSemester: SemesterGrades;
  targetGrade: number;
}

interface UpdateGradeFn {
  (semester: 'first' | 'second', gradeType: keyof SemesterGrades, value: number | null): void;
}

interface Return {
  state: State;
  updateGrade: UpdateGradeFn;
  setTargetGrade: (value: number) => void;
  setPeriod: (value: 'semester' | 'year') => void;
  reset: () => void;
  result: {
    firstSemesterGrade: number | null;
    secondSemesterGrade: number | null;
    yearGrade: number | null;
    status: 'approved' | 'reprovado' | 'indefinido' | null;
  };
}

const initialState: State = {
  period: 'semester',
  firstSemester: {},
  secondSemester: {},
  targetGrade: 7.0,
};

const isValidGrade = (value: number | null): boolean => {
  return value === null || (value >= 0 && value <= 10);
};

export function useGradeCalculator(): Return {
  const [state, setState] = useState<State>(initialState);

  const updateGrade = useCallback<UpdateGradeFn>((semester, gradeType, value) => {
    if (!isValidGrade(value)) return;
    setState(prev => ({
      ...prev,
      [semester === 'first' ? 'firstSemester' : 'secondSemester']: {
        ...prev[semester === 'first' ? 'firstSemester' : 'secondSemester'],
        [gradeType]: value,
      },
    }));
  }, []);

  const setTargetGrade = useCallback((value: number) => {
    if (value >= 0 && value <= 10) {
      setState(prev => ({ ...prev, targetGrade: value }));
    }
  }, []);

  const setPeriod = useCallback((value: 'semester' | 'year') => {
    setState(prev => ({ ...prev, period: value }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // Compute results
  const firstSemesterGrade = calculateSemesterGrade(state.firstSemester);
  const secondSemesterGrade =
    state.period === 'year' ? calculateSemesterGrade(state.secondSemester) : null;
  const yearGrade =
    state.period === 'year'
      ? calculateYearGrade(firstSemesterGrade, secondSemesterGrade)
      : firstSemesterGrade;

  let status: 'approved' | 'reprovado' | 'indefinido' | null = null;
  if (yearGrade !== null) {
    status = yearGrade >= state.targetGrade ? 'approved' : 'reprovado';
  } else {
    status = 'indefinido';
  }

  return {
    state,
    updateGrade,
    setTargetGrade,
    setPeriod,
    reset,
    result: {
      firstSemesterGrade,
      secondSemesterGrade,
      yearGrade,
      status,
    },
  };
}
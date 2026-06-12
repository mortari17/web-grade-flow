export interface FdsbcGrades {
  p1?: number | null
  p2?: number | null
  p3?: number | null
  p4?: number | null
}

export interface FdsbcGradeState {
  p1: string
  p2: string
  p3: string
  p4: string
}

export interface FdsbcGradeResult {
  /** Média atual com as notas fornecidas (notas faltantes tratadas como 0 na exibição) */
  currentAverage: number
  /** Nota necessária nas provas restantes para atingir a média */
  requiredAverage?: number
  /** Quantas provas ainda faltam */
  remainingCount: number
  /** A pessoa já passou? */
  hasPassedTheGrade: boolean
  /** Já é impossível passar mesmo tirando 10 em tudo? */
  isImpossible: boolean
}

export const FDSBC_AVERAGE = 7.0
export const FDSBC_TOTAL_PROVAS = 4
export const FDSBC_BIMESTRES = 2
export const FDSBC_PROVAS_POR_BIMESTRE = 2

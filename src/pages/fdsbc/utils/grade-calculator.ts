import { FdsbcGrades, FdsbcGradeResult, FDSBC_AVERAGE, FDSBC_TOTAL_PROVAS } from '../types'

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}

/**
 * Calcula a média e a nota necessária nas provas restantes.
 *
 * Regras FDSBC:
 * - 4 provas por ano (2 por bimestre), pesos iguais
 * - Média mínima: 7.0
 * - Se ainda há provas faltando, calcula a média necessária para bater o alvo
 */
export function calculateFdsbcGrade(grades: FdsbcGrades): FdsbcGradeResult {
  const fields: Array<keyof FdsbcGrades> = ['p1', 'p2', 'p3', 'p4']

  const entered: number[] = []
  const missingCount = fields.reduce((acc, f) => {
    const v = grades[f]
    if (v !== null && v !== undefined) {
      entered.push(v)
    } else {
      acc++
    }
    return acc
  }, 0)

  const enteredSum = entered.reduce((a, b) => a + b, 0)
  const remainingCount = missingCount

  // Média considerando somente as provas inseridas (para exibição parcial)
  const currentAverage =
    entered.length > 0 ? round2(enteredSum / FDSBC_TOTAL_PROVAS) : 0

  // Já tem todas as notas
  if (remainingCount === 0) {
    const finalAverage = round2(enteredSum / FDSBC_TOTAL_PROVAS)
    return {
      currentAverage: finalAverage,
      remainingCount: 0,
      hasPassedTheGrade: finalAverage >= FDSBC_AVERAGE,
      isImpossible: false,
    }
  }

  // Soma necessária no total para atingir a média
  const targetSum = FDSBC_AVERAGE * FDSBC_TOTAL_PROVAS // 28
  const neededSum = targetSum - enteredSum
  const requiredAverage = round2(neededSum / remainingCount)

  const isImpossible = requiredAverage > 10
  const hasPassedTheGrade = false // ainda tem provas faltando

  return {
    currentAverage,
    requiredAverage,
    remainingCount,
    hasPassedTheGrade,
    isImpossible,
  }
}

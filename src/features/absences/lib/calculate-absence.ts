import { MAX_ABSENCE_RATE } from '@/config/fiap'
import { CLASSES_PER_DAY } from '../constants'
import type { AbsenceRequest, AbsenceResponse } from '../types'

export function calculateAbsence({ absences, classes }: AbsenceRequest): AbsenceResponse {
  const maxAbsencesAllowed = Math.floor(classes * MAX_ABSENCE_RATE)
  const missingAbsences = Math.max(0, maxAbsencesAllowed - absences)
  const classesPerDay = CLASSES_PER_DAY[classes]

  return {
    missingAbsences,
    missingDays: classesPerDay ? Math.floor(missingAbsences / classesPerDay) : 0,
    isOk: absences <= maxAbsencesAllowed,
  }
}

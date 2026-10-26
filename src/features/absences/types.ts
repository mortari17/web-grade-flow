export enum EnumClasses {
  CLASSES_80 = '80',
  CLASSES_160 = '160',
}

export interface AbsenceRequest {
  absences: number
  classes: number
}

export interface AbsenceResponse {
  missingAbsences: number
  missingDays: number
  isOk: boolean
}

export interface AbsenceFormErrors {
  absences?: string
  classes?: string
}

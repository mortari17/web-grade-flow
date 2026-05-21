export enum EnumPeriod {
  SEMESTER = 'semester',
  YEAR = 'year'
}

export interface Semester {
  cp1?: number | null;
  cp2?: number | null;
  sprint1?: number | null;
  sprint2?: number | null;
  gs?: number | null;
}

export interface SemesterValidator {
  cp1: boolean;
  cp2: boolean;
  sprint1: boolean;
  sprint2: boolean;
  gs: boolean;
}

export interface CalculateGradeReq {
  period: EnumPeriod;
  firstSemester: Semester;
  secondSemester?: Semester;
  targetGrade?: number;
}

export interface CalculateGradeRes {
  average: number;
  hasPassedTheGrade: boolean;
  requiredGs?: number;
  currentGrade?: number;
}

export interface CalculateAbsenceReq {
  absences: number;
  classes: number;
}

export interface CalculateAbsenceRes {
  missingAbsences: number;
  isOk: boolean;
}

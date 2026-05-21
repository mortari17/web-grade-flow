import type { Semester, SemesterValidator, CalculateGradeRes, CalculateAbsenceRes } from "../types";
import type { CPS_AND_SPRINTS_WEIGHT, GS_WEIGHT } from "./constants";


export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function validateGrades(semester: Semester): SemesterValidator {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (semester.cps < 0 || semester.cps > 10) {
    errors.push('CPS grade must be between 0 and 10');
  }
  if (semester.sprints < 0 || semester.sprints > 10) {
    errors.push('Sprints grade must be between 0 and 10');
  }
  if (semester.gs < 0 || semester.gs > 10) {
    errors.push('GS grade must be between 0 and 10');
  }
  if (semester.challenge < 0 || semester.challenge > 10) {
    errors.push('Challenge grade must be between 0 and 10');
  }

  return { errors, warnings };
}

export function normalizeMissingGrades(semester: Semester, validator: SemesterValidator): Semester {
  if (validator.errors.length > 0) {
    return semester;
  }
  const normalized = { ...semester };
  if (normalized.cps === undefined || normalized.cps === null) {
    normalized.cps = 0;
  }
  if (normalized.sprints === undefined || normalized.sprints === null) {
    normalized.sprints = 0;
  }
  if (normalized.gs === undefined || normalized.gs === null) {
    normalized.gs = 0;
  }
  if (normalized.challenge === undefined || normalized.challenge === null) {
    normalized.challenge = 0;
  }
  return normalized;
}

export function calculateSemesterGrade(semester: Semester, targetGrade: number): CalculateGradeRes {
  const cpsSprintsWeight = CPS_AND_SPRINTS_WEIGHT;
  const gsWeight = GS_WEIGHT;

  const averageCpsSprints = (semester.cps + semester.sprints) / 2;
  const currentWeighted = averageCpsSprints * cpsSprintsWeight + semester.challenge * cpsSprintsWeight;
  const currentGrade = round2(currentWeighted + semester.gs * gsWeight);

  const neededGs = (targetGrade - currentWeighted) / gsWeight;
  const neededFinal = round2(neededGs > 10 ? 10 : neededGs < 0 ? 0 : neededGs);

  return {
    currentGrade,
    neededFinal,
    status: currentGrade >= targetGrade ? 'approved' : (neededFinal <= 10 ? 'pending' : 'impossible')
  };
}

export function calculateSemesterAverage(semester: Semester, includeGs: boolean = true): number {
  const cpsSprintsWeight = CPS_AND_SPRINTS_WEIGHT;
  const gsWeight = GS_WEIGHT;

  const averageCpsSprints = (semester.cps + semester.sprints) / 2;
  const weighted = averageCpsSprints * cpsSprintsWeight + semester.challenge * cpsSprintsWeight;
  if (includeGs) {
    return round2(weighted + semester.gs * gsWeight);
  }
  return round2(weighted);
}

export function calculateYearGrade(firstSemester: Semester, secondSemester: Semester, targetGrade: number): CalculateGradeRes {
  const firstAvg = calculateSemesterAverage(firstSemester);
  const secondAvg = calculateSemesterAverage(secondSemester);
  const yearAvg = round2((firstAvg + secondAvg) / 2);

  const neededSecond = round2(targetGrade * 2 - firstAvg);
  const neededSecondClamped = neededSecond > 10 ? 10 : neededSecond < 0 ? 0 : neededSecond;

  return {
    currentGrade: yearAvg,
    neededFinal: neededSecondClamped,
    status: yearAvg >= targetGrade ? 'approved' : (neededSecondClamped <= 10 ? 'pending' : 'impossible')
  };
}

export function calculateAbsence(absences: number, classes: number): CalculateAbsenceRes {
  const attendance = ((classes - absences) / classes) * 100;
  const minAttendance = 75;
  return {
    attendance: round2(attendance),
    status: attendance >= minAttendance ? 'approved' : 'failed'
  };
}

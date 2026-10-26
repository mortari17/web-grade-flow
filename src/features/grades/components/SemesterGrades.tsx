import { GRADE_LABELS, GRADE_MESSAGES } from '../constants'
import type { GradeField, SemesterErrors, SemesterForm } from '../types'
import { GradeInput } from './GradeInput'

const PARTIAL_FIELDS: GradeField[] = ['cp1', 'cp2', 'sprint1', 'sprint2']

interface SemesterGradesProps {
  idPrefix: string
  title: string
  grades: SemesterForm
  errors: SemesterErrors
  onChange: (field: GradeField, value: string) => void
  showGsHint: boolean
}

export function SemesterGrades({
  idPrefix,
  title,
  grades,
  errors,
  onChange,
  showGsHint,
}: SemesterGradesProps) {
  const renderInput = (field: GradeField, description?: string) => (
    <GradeInput
      key={field}
      id={`${idPrefix}-${field}`}
      label={GRADE_LABELS[field]}
      value={grades[field]}
      onChange={(value) => onChange(field, value)}
      error={errors[field]}
      description={description}
      descriptionClassName="text-primary"
    />
  )

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="h-0.5 w-12 rounded-full bg-primary" />
        <h4 className="text-sm font-bold text-primary">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PARTIAL_FIELDS.map((field) => renderInput(field))}
      </div>
      {renderInput('gs', showGsHint ? GRADE_MESSAGES.gsHint : undefined)}
    </div>
  )
}

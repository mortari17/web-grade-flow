import { CheckboxField } from '@/components/shared/CheckboxField'
import { GRADE_LABELS, GRADE_MESSAGES } from '../constants'
import {
  PARTIAL_GRADE_FIELDS,
  type GradeField,
  type SemesterErrors,
  type SemesterForm,
} from '../types'
import { GradeInput } from './GradeInput'

interface SemesterGradesProps {
  idPrefix: string
  title: string
  grades: SemesterForm
  errors: SemesterErrors
  onChange: (changes: Partial<SemesterForm>) => void
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
      onChange={(value) => onChange({ [field]: value })}
      error={errors[field]}
      description={description}
      descriptionClassName="text-primary"
      allowEmpty={field === 'gs'}
    />
  )

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="h-0.5 w-12 rounded-full bg-primary" />
        <h4 className="text-sm font-bold text-primary">{title}</h4>
      </div>
      {grades.useAverage ? (
        renderInput('average')
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {PARTIAL_GRADE_FIELDS.map((field) => renderInput(field))}
        </div>
      )}
      <CheckboxField
        id={`${idPrefix}-use-average`}
        label="Usar nota média"
        checked={grades.useAverage}
        onCheckedChange={(useAverage) => onChange({ useAverage })}
      />
      {renderInput('gs', showGsHint ? GRADE_MESSAGES.gsHint : undefined)}
    </div>
  )
}

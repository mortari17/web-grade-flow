import type { ReactNode } from 'react'
import { FormField } from '@/components/shared/FormField'
import { FormInput } from '@/components/shared/FormInput'
import { sanitizeGradeInput } from '../lib/grade-input'

interface GradeInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  description?: ReactNode
  descriptionClassName?: string
  optional?: boolean
}

export function GradeInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0.00 - 10',
  error,
  description,
  descriptionClassName,
  optional,
}: GradeInputProps) {
  return (
    <FormField
      id={id}
      label={label}
      optional={optional}
      error={error}
      description={description}
      descriptionClassName={descriptionClassName}
    >
      <FormInput
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(sanitizeGradeInput(e.target.value))}
        placeholder={placeholder}
        invalid={Boolean(error)}
      />
    </FormField>
  )
}

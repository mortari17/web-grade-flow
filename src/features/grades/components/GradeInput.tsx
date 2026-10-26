import type { ReactNode } from 'react'
import { FormField } from '@/components/shared/FormField'
import { FormInput } from '@/components/shared/FormInput'
import { maskGradeInput } from '../lib/grade-input'

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
  /** Permite deixar o campo vazio (ex.: GS ainda não realizada). */
  allowEmpty?: boolean
}

export function GradeInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0,00 - 10',
  error,
  description,
  descriptionClassName,
  optional,
  allowEmpty,
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
        onChange={(e) => onChange(maskGradeInput(e.target.value, value, allowEmpty))}
        placeholder={placeholder}
        invalid={Boolean(error)}
      />
    </FormField>
  )
}

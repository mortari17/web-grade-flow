import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { handleChange } from '../utils'

interface GradeInputProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  description?: string
  inputClassName?: string
  labelClassName?: string
}

export function GradeInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  description,
  inputClassName,
  labelClassName,
}: GradeInputProps) {
  const inputId = id ?? label

  return (
    <div className="space-y-1">
      <Label htmlFor={inputId}>
        <span className={cn('text-neutral-300', labelClassName)}>{label}</span>
      </Label>
      <Input
        id={inputId}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => handleChange(e, onChange)}
        placeholder={placeholder ?? '0,0 – 10,0'}
        className={cn(
          'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
          error && 'border-destructive focus-visible:ring-destructive',
          inputClassName,
        )}
      />
      {description && <p className="text-xs text-muted-foreground text-primary">{description}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

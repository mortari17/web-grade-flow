import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { handleChange } from '../utils'

interface GradeInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  description?: string
}

export function GradeInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  description,
}: GradeInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={label}>{<span className="text-neutral-300">{label}</span>}</Label>
      <Input
        id={label}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => handleChange(e, onChange)}
        placeholder={placeholder ?? '0.00 - 10'}
        className={cn(
          'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
          error && 'border-destructive focus-visible:ring-destructive',
        )}
      />
      {description && <p className="text-xs text-muted-foreground text-primary">{description}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

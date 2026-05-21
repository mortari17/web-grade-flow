import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface GradeInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function GradeInput({ label, value, onChange, placeholder, error }: GradeInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="number"
        min={0}
        max={10}
        step={0.1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '0.0 - 10.0'}
        className={cn(error && 'border-destructive focus-visible:ring-destructive')}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

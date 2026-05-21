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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const filtered = raw.replace(/[^0-9.,]/g, '').slice(0, 2)
    onChange(filtered)
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? '0.0 - 10.0'}
        className={cn(
          'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]',
          error && 'border-destructive focus-visible:ring-destructive',
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

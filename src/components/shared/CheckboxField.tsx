import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface CheckboxFieldProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function CheckboxField({ id, label, checked, onCheckedChange }: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(state) => onCheckedChange(state === true)}
      />
      <Label htmlFor={id} className="cursor-pointer text-sm text-neutral-300">
        {label}
      </Label>
    </div>
  )
}

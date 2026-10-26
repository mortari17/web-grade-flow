import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectFieldProps<T extends string> {
  id?: string
  value: T
  options: SelectOption<T>[]
  onValueChange: (value: T) => void
  placeholder?: string
}

export function SelectField<T extends string>({
  id,
  value,
  options,
  onValueChange,
  placeholder = 'Selecione',
}: SelectFieldProps<T>) {
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as T)}>
      <SelectTrigger
        id={id}
        className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-neutral-800 border border-neutral-700 rounded-lg">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-white hover:bg-neutral-700"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

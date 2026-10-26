import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  description?: ReactNode
  descriptionClassName?: string
  children: ReactNode
}

export function FormField({
  id,
  label,
  optional,
  error,
  description,
  descriptionClassName,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="flex gap-1">
        <span className="text-neutral-300">{label}</span>
        {optional && <span className="font-normal text-neutral-500">(opcional)</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
      {description && (
        <p className={cn('text-xs text-neutral-500', descriptionClassName)}>{description}</p>
      )}
    </div>
  )
}

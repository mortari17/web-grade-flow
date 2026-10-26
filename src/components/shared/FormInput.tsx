import { forwardRef, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, invalid, type = 'text', ...props }, ref) => (
    <Input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500',
        invalid && 'border-destructive focus-visible:ring-destructive',
        className,
      )}
      {...props}
    />
  ),
)
FormInput.displayName = 'FormInput'

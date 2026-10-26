import { Button } from '@/components/ui/button'

interface FormActionsProps {
  onSubmit: () => void
  onReset: () => void
  submitLabel?: string
  resetLabel?: string
}

export function FormActions({
  onSubmit,
  onReset,
  submitLabel = 'Calcular',
  resetLabel = 'Limpar',
}: FormActionsProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={onSubmit} className="flex-1 shadow-lg shadow-primary/25">
        {submitLabel}
      </Button>
      <Button onClick={onReset} className="text-white bg-neutral-700 hover:bg-neutral-600">
        {resetLabel}
      </Button>
    </div>
  )
}

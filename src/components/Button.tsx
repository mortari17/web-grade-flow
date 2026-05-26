import { Button } from './ui/button'

type ButtonComponentProps = {
  onClick: () => void
  className?: string
  label: string
}

export function ButtonComponent({ onClick, className, label }: ButtonComponentProps) {
  return (
    <Button onClick={onClick} className={className}>
      {label}
    </Button>
  )
}

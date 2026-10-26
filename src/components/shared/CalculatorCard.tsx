import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CalculatorCardProps {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: ReactNode
  titleClassName?: string
  contentClassName?: string
  children: ReactNode
}

export function CalculatorCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  titleClassName,
  contentClassName,
  children,
}: CalculatorCardProps) {
  return (
    <Card className="border-t-4 border-t-primary shadow-lg bg-neutral-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        </div>
        <CardTitle className={cn('text-xl text-neutral-300', titleClassName)}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}

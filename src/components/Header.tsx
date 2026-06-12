import { GraduationCap } from 'lucide-react'

interface HeaderProps {
  institution?: string
  accentClass?: string
  icon?: React.ReactNode
}

export function Header({
  institution = 'FIAP',
  accentClass = 'bg-primary',
  icon,
}: HeaderProps) {
  return (
    <header className="border-b border-neutral-800 bg-black text-white">
      <div className="container max-w-3xl mx-auto flex items-center gap-3 py-4 px-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${accentClass}`}>
          {icon ?? <GraduationCap className="h-6 w-6 text-black" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">GradeFlow</h1>
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest text-black px-2 py-0.5 rounded-full ${accentClass}`}
            >
              {institution}
            </span>
          </div>
          <p className="text-xs text-gray-400">Calculadora de notas</p>
        </div>
      </div>
    </header>
  )
}

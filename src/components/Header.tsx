import { GraduationCap, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  institution?: string
  accentClass?: string
  icon?: React.ReactNode
  bgClass?: string
  borderClass?: string
}

export function Header({
  institution = 'FIAP',
  accentClass = 'bg-primary',
  icon,
  bgClass = 'bg-black',
  borderClass = 'border-neutral-800',
}: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className={`border-b ${borderClass} ${bgClass} text-white`}>
      <div className="container max-w-3xl mx-auto flex items-center gap-3 py-4 px-4">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white shrink-0"
          aria-label="Voltar para home"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${accentClass}`}>
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

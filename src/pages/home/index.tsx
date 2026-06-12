import { useNavigate } from 'react-router-dom'
import { GraduationCap, Scale, ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'

const institutions = [
  {
    id: 'fiap',
    name: 'FIAP',
    description: 'Faculdade de Informática e Administração Paulista',
    path: '/fiap',
    icon: <GraduationCap className="h-5 w-5 text-white" />,
    iconBg: 'bg-rose-600',
    border: 'hover:border-rose-200',
  },
  {
    id: 'fdsbc',
    name: 'FDSBC',
    description: 'Faculdade de Direito de São Bernardo do Campo',
    path: '/fdsbc',
    icon: <Scale className="h-5 w-5 text-blue-950" />,
    iconBg: 'bg-amber-400',
    border: 'hover:border-amber-200',
  },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">GradeFlow</h1>
              <p className="text-slate-500 mt-1 text-sm">
                Calcule notas e faltas com facilidade
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Selecione sua instituição
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {institutions.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => navigate(inst.path)}
                  className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-all group text-left border-l-2 border-l-transparent ${inst.border} focus:outline-none focus-visible:bg-slate-50`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${inst.iconBg}`}
                  >
                    {inst.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{inst.name}</p>
                    <p className="text-xs text-slate-500 truncate">{inst.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

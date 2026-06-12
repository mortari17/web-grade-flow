import { useNavigate } from 'react-router-dom'
import { ArrowRight, Code2, Scale } from 'lucide-react'
import { Footer } from '@/components/Footer'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-8">

          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold tracking-tight leading-none">
              <span className="text-slate-900">Grade</span>
              <span className="text-rose-600">Flow</span>
            </h1>
            <p className="text-slate-500">Chega de fazer conta na mão.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/fiap')}
              className="relative w-full overflow-hidden rounded-2xl bg-rose-600 p-5 text-left transition-colors hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 group"
            >
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-rose-200 mb-1">Tecnologia &amp; Gestão</p>
                  <p className="text-xl font-bold text-white leading-tight">FIAP</p>
                  <p className="text-xs text-rose-100/70 mt-1 leading-relaxed">
                    Faculdade de Informática e Administração Paulista
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-rose-200 transition-transform group-hover:translate-x-0.5" />
              </div>
              <Code2
                className="absolute -bottom-2 -right-2 h-20 w-20 rotate-12 text-white opacity-[0.07]"
                strokeWidth={1.5}
              />
            </button>

            <button
              onClick={() => navigate('/fdsbc')}
              className="relative w-full overflow-hidden rounded-2xl bg-blue-950 border border-blue-900 p-5 text-left transition-colors hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 group"
            >
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-amber-400/80 mb-1">Direito</p>
                  <p className="text-xl font-bold text-white leading-tight">FDSBC</p>
                  <p className="text-xs text-blue-300/60 mt-1 leading-relaxed">
                    Faculdade de Direito de São Bernardo do Campo
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-blue-400 transition-all group-hover:text-amber-400 group-hover:translate-x-0.5" />
              </div>
              <Scale
                className="absolute -bottom-2 -right-3 h-20 w-20 text-blue-400 opacity-[0.06]"
                strokeWidth={1.5}
              />
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

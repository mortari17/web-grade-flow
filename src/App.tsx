import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AbsenceCalculator } from '@/components/AbsenceCalculator'
import { GradeCalculator } from '@/components/GradeCalculator'
import { GraduationCap, CalendarCheck } from 'lucide-react'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <header className="border-b border-border border-neutral-800 bg-black text-white">
        <div className="container max-w-3xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">GradeFlow</h1>
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-primary text-white px-2 py-0.5 rounded-full">
                FIAP
              </span>
            </div>
            <p className="text-xs text-gray-400">Calculadora de notas</p>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto py-8 px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl text-primary font-bold tracking-tight">
            De quanto você precisa? Quantas vezes ainda pode faltar? GradeFlow sabe!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Calcule notas e faltas seguindo o modelo de avaliação FIAP
          </p>
        </div>

        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 dark:bg-white/5">
            <TabsTrigger
              value="grades"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-neutral-900 data-[state=active]:rounded-sm"
            >
              <GraduationCap className="h-4 w-4" />
              Notas
            </TabsTrigger>
            <TabsTrigger
              value="absences"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-neutral-900 data-[state=active]:rounded-sm"
            >
              <CalendarCheck className="h-4 w-4" />
              Faltas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades">
            <GradeCalculator />
          </TabsContent>
          <TabsContent value="absences">
            <AbsenceCalculator />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-neutral-800 bg-black text-gray-500">
        <div className="container max-w-3xl mx-auto flex items-center justify-between py-6 px-4 sm:flex-row flex-col gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">GradeFlow</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-medium text-gray-300">GradeFlow</span>. Todos os direitos
            reservados.
          </p>

          <p className="text-xs text-gray-400">
            Desenvolvido por <span className="font-medium text-gray-300">Leonardo Mortari</span> e{' '}
            <span className="font-medium text-gray-300">João Castro</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AbsenceCalculator } from "@/components/AbsenceCalculator"
import { GradeCalculator } from "@/components/GradeCalculator"
import { GraduationCap, CalendarCheck } from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-accent/30 to-white dark:from-black dark:via-accent/10 dark:to-black">
      <header className="border-b border-border bg-black text-white">
        <div className="container max-w-3xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary shadow-lg shadow-primary/30">
            <GraduationCap className="h-6 w-6 text-white" />
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

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Sua <span className="text-primary">média</span> na palma da mão
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Calcule notas e faltas seguindo o modelo de avaliação FIAP
          </p>
        </div>

        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 dark:bg-white/5">
            <TabsTrigger value="grades" className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:bg-transparent">
              <GraduationCap className="h-4 w-4" />
              Notas
            </TabsTrigger>
            <TabsTrigger value="absences" className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:bg-transparent">
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

      <footer className="border-t border-border bg-black text-gray-500 mt-12">
        <div className="container max-w-3xl mx-auto py-6 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>GradeFlow</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider">
              <span className="text-gray-600">Desenvolvido por</span>
              <span className="text-gray-400 font-medium">Leonardo Mortari</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
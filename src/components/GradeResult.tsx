import { GradeResponse } from "@/lib/types"
import { CheckCircle2, AlertCircle, Target, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface GradeResultProps {
  result: GradeResponse
  targetGrade: number
  onReset: () => void
}

export function GradeResult({ result, targetGrade, onReset }: GradeResultProps) {
  return (
    <div className="space-y-4">
      <div className={cn(
        "rounded-lg border-2 p-5 space-y-4",
        result.hasPassedTheGrade
          ? "border-green-200 bg-green-50/50 dark:bg-green-950/10"
          : "border-red-200 bg-red-50/50 dark:bg-red-950/10"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              result.hasPassedTheGrade
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            )}>
              {result.hasPassedTheGrade ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div>
              <p className={cn(
                "text-lg font-bold",
                result.hasPassedTheGrade ? "text-green-700" : "text-red-700"
              )}>
                {result.hasPassedTheGrade ? "Aprovado!" : "Não passou"}
              </p>
              <p className="text-xs text-muted-foreground">
                Média necessária: {targetGrade.toFixed(1)}
              </p>
            </div>
          </div>
          {result.hasPassedTheGrade && (
            <span className="text-2xl">🎉</span>
          )}
        </div>

        <div className="flex items-baseline justify-center gap-2 py-3">
          <span className="text-sm text-muted-foreground">Média final:</span>
          <span className={cn(
            "text-4xl font-black tracking-tight",
            result.hasPassedTheGrade ? "text-green-600" : "text-red-600"
          )}>
            {result.average.toFixed(2)}
          </span>
        </div>

        {result.requiredGs !== undefined && (
          <div className="flex items-start gap-3 rounded-lg border border-magenta-300 bg-magenta-50 dark:bg-magenta-950/20 p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-magenta-100 shrink-0">
              <Target className="h-4 w-4 text-magenta-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-magenta-600">
                  GS Necessária
                </span>
              </div>
              <p className="text-sm">
                Você precisa tirar{" "}
                <strong className="text-magenta-600 text-lg">{result.requiredGs.toFixed(2)}</strong>
                {" "}na GS para atingir a média <strong>{targetGrade.toFixed(1)}</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        >
          <GraduationCap className="h-4 w-4" />
          Novo cálculo
        </button>
      </div>
    </div>
  )
}

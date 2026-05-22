import { GradeInput } from './GradeInput'

interface SemesterGradesProps {
  prefix: string
  title: string
  grades: { cp1: string; cp2: string; sprint1: string; sprint2: string; gs: string }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
  showGSDescription: boolean
}

export function SemesterGrades({
  title,
  grades,
  onChange,
  errors,
  showGSDescription,
}: SemesterGradesProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="h-0.5 w-12 rounded-full bg-primary" />
        <h4 className="text-sm font-bold text-foreground text-primary">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-3 text-primary">
        <GradeInput
          label={`CP1`}
          value={grades.cp1}
          onChange={(v) => onChange('cp1', v)}
          error={errors.cp1}
        />
        <GradeInput
          label={`CP2`}
          value={grades.cp2}
          onChange={(v) => onChange('cp2', v)}
          error={errors.cp2}
        />
        <GradeInput
          label={`Sprint 1`}
          value={grades.sprint1}
          onChange={(v) => onChange('sprint1', v)}
          error={errors.sprint1}
        />
        <GradeInput
          label={`Sprint 2`}
          value={grades.sprint2}
          onChange={(v) => onChange('sprint2', v)}
          error={errors.sprint2}
        />
      </div>
      <GradeInput
        label={`GS`}
        value={grades.gs}
        onChange={(v) => onChange('gs', v)}
        error={errors.gs}
        description={
          showGSDescription
            ? `Caso não tenha essa nota, deixe em branco e vamos calcular quanto você precisa tirar para atingir a nota alvo!`
            : undefined
        }
      />
    </div>
  )
}

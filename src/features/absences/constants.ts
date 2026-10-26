import type { SelectOption } from '@/components/shared/SelectField'
import { EnumClasses } from './types'

export const CLASSES_PER_DAY: Record<number, number> = {
  80: 2,
  160: 4,
}

export const CLASSES_OPTIONS: SelectOption<EnumClasses>[] = [
  { value: EnumClasses.CLASSES_80, label: '80' },
  { value: EnumClasses.CLASSES_160, label: '160' },
]

export const ABSENCE_MESSAGES = {
  invalidAbsences: 'Digite um número inteiro maior do que 0',
  invalidClasses: 'Selecione um valor válido',
  limitAttended: 'Dentro do limite de faltas',
  limitExceeded: 'Limite de faltas excedido',
}

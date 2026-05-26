export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
) => {
  const raw = e.target.value

  let filtered = raw.replace(/[^0-9,]/g, '')

  if (filtered.startsWith(',')) {
    filtered = filtered.slice(1)
  }

  if (filtered.includes(',')) {
    filtered = filtered.slice(0, 4)
  } else {
    filtered = filtered.slice(0, 2)
  }

  onChange(filtered)
}

export function toNumberOrUndefined(value: string): number | undefined {
  if (!value || value.trim() === '') {
    return undefined
  }

  const normalized = value.replace(/,/g, '.')
  const number = Number(normalized)

  if (isNaN(number)) {
    return undefined
  }

  return number
}

export function validateGrade(val: string): boolean {
  const trimmed = val.trim()

  const commaPattern = /^\d{1,2}(?:,\d{1,2})?$/
  const dotPattern = /^\d{1,2}(?:\.\d{1,2})?$/

  let normalized: string
  if (commaPattern.test(trimmed)) {
    normalized = trimmed.replace(',', '.')
  } else if (dotPattern.test(trimmed)) {
    normalized = trimmed
  } else {
    return true
  }

  const num = Number(normalized)
  return !isNaN(num) && num >= 0.01 && num <= 10.0
}

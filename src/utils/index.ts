export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
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
import { useEffect, useState } from 'react'

function readStorage<T>(key: string, fallback: T, parse: (raw: unknown) => T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : parse(JSON.parse(raw))
  } catch {
    return fallback
  }
}

export function useLocalStorage<T>(key: string, fallback: T, parse: (raw: unknown) => T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback, parse))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage indisponível (modo privado, cota cheia): segue só em memória.
    }
  }, [key, value])

  return [value, setValue] as const
}

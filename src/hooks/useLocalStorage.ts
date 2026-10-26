import { useEffect, useState } from 'react'

function readStorage<T>(key: string, fallback: T, parse: (raw: unknown) => T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : parse(JSON.parse(raw))
  } catch {
    return fallback
  }
}

/**
 * Estado persistido no localStorage do navegador. `parse` valida o valor lido
 * (dados antigos ou corrompidos caem no `fallback`). Falhas de acesso são ignoradas.
 */
export function useLocalStorage<T>(key: string, fallback: T, parse: (raw: unknown) => T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback, parse))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage indisponível (modo privado, cota cheia): mantém só em memória.
    }
  }, [key, value])

  return [value, setValue] as const
}

import { useCallback, useEffect, useState } from 'react'

export const useLocalStorage =
  <T>(key: string, fallbackValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const createFallbackValue = useCallback(
      (): T => fallbackValue instanceof Function ? fallbackValue() : fallbackValue,
      [fallbackValue],
    )

    const [value, setValueInner] = useState<T>(() => {
      const json = localStorage.getItem(key)
      if (json === null) {
        return createFallbackValue()
      }

      try {
        return JSON.parse(json)
      } catch (e) {
        if (e instanceof SyntaxError) {
          return createFallbackValue()
        }
        throw e
      }
    })

    const setValue = (newValue: T | ((prevState: T) => T)) => {
      if (newValue instanceof Function) {
        newValue = newValue(value)
      }
      setValueInner(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    }

    useEffect(() => {
      const listener = (ev: StorageEvent) => {
        if (ev.key !== key) return;

        const json = ev.newValue
        if (json !== null) {
          setValueInner(JSON.parse(json))
        } else {
          setValueInner(createFallbackValue())
        }
      }

      addEventListener('storage', listener)
      return () => {
        removeEventListener('storage', listener)
      }
    }, [key, createFallbackValue])

    return [value, setValue]
  }

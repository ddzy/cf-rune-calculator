import type { CalculationResult } from '../types/calculator'

const storageKey = 'cf-rune-calculator:history'

export function loadHistory(): CalculationResult[] | null {
  try {
    const value = localStorage.getItem(storageKey)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export function saveHistory(history: CalculationResult[]) {
  localStorage.setItem(storageKey, JSON.stringify(history))
}

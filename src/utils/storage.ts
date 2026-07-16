import type { CalculationResult } from '../types/calculator'

const storageKey = 'cf-rune-calculator:history'

export function loadHistory(): CalculationResult[] {
  try {
    const value = localStorage.getItem(storageKey)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

export function saveHistory(history: CalculationResult[]) {
  localStorage.setItem(storageKey, JSON.stringify(history))
}

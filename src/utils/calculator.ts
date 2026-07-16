import { runeConfig } from '../data/runeConfig'
import type { CalculatorForm } from '../types/calculator'

export function calculate(form: CalculatorForm) {
  const arms = (form.arms ?? 0) / 100
  const rate = (form.rate ?? 0) / 100
  const crit = (form.crit ?? 0) / 100
  const main = (form.main ?? 0) / 100
  const black = form.black ?? 0
  const doll = form.doll ?? 0

  const legacyBaseCrit = runeConfig.legacyCritBase + crit
  const legacyBaseRate = runeConfig.baseCritRate + rate
  const legacyResult = (1 + legacyBaseCrit * legacyBaseRate) * (1 + arms)

  const totalArms = (1 + arms) * (1 + main) * (1 + doll * runeConfig.dollRuneRate)
  const totalRate = runeConfig.baseCritRate + rate
  const totalCrit = runeConfig.totalCritBase + crit
  const totalBlack = 1 + black * runeConfig.blackRuneRate
  const totalResult = (1 + totalRate * (totalCrit - 1)) * (totalArms * totalBlack / runeConfig.blackBase)

  return {
    legacyResult: round(legacyResult),
    totalResult: round(totalResult),
  }
}

function round(value: number) {
  return Number(value.toFixed(3))
}

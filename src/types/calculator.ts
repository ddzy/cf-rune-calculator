export type CalculatorForm = {
  arms: number | null
  rate: number | null
  crit: number | null
  main: number | null
  black: number | null
  doll: number | null
}

export type CalculationResult = CalculatorForm & {
  id: string
  index: number
  legacyResult: number
  totalResult: number
  createdAt: string
}

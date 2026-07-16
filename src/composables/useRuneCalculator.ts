import { computed, reactive, ref, watch } from 'vue'
import type { CalculatorForm, CalculationResult } from '../types/calculator'
import { calculate } from '../utils/calculator'
import { loadHistory, saveHistory } from '../utils/storage'
import { fieldConfig } from '../data/runeConfig'

const initialForm = (): CalculatorForm => ({ arms: null, rate: null, crit: null, main: null, black: null, doll: null })

export function useRuneCalculator() {
  const form = reactive<CalculatorForm>(initialForm())
  const history = ref<CalculationResult[]>(loadHistory())
  const errorMessage = ref('')
  const latest = computed(() => history.value[0] ?? null)

  watch(history, (value) => saveHistory(value), { deep: true })

  function calculateCurrent() {
    const missing = Object.entries(form).find(([, value]) => value === null || Number.isNaN(value))
    if (missing) {
      errorMessage.value = '请先完整填写所有参数。'
      return
    }
    const outOfRange = fieldConfig.find((field) => {
      const value = form[field.key]
      return value !== null && (value < field.min || value > field.max)
    })
    if (outOfRange) {
      errorMessage.value = `${outOfRange.label}请输入 ${outOfRange.min}-${outOfRange.max} 范围内的数值。`
      return
    }

    const result = calculate(form)
    history.value.unshift({
      ...form,
      ...result,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      index: history.value.length,
      createdAt: new Date().toISOString(),
    })
    errorMessage.value = ''
  }

  function resetForm() {
    Object.assign(form, initialForm())
    errorMessage.value = ''
  }

  function removeResult(id: string) {
    history.value = history.value.filter((item) => item.id !== id)
  }

  function clearHistory() {
    history.value = []
  }

  return { form, history, latest, errorMessage, calculateCurrent, resetForm, removeResult, clearHistory }
}

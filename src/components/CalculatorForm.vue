<script setup lang="ts">
import { fieldConfig } from '../data/runeConfig'
import type { CalculatorForm } from '../types/calculator'

const props = defineProps<{ form: CalculatorForm; errorMessage: string }>()
const emit = defineEmits<{ calculate: []; reset: [] }>()

function update(key: keyof CalculatorForm, value: string) {
  props.form[key] = value === '' ? null : Number(value)
}
</script>

<template>
  <form class="calculator-form" @submit.prevent="emit('calculate')">
    <div class="form-heading">
      <div>
        <p class="eyebrow">输入符文参数</p>
        <h2>开始计算</h2>
      </div>
      <button class="text-button" type="button" @click="emit('reset')">重置</button>
    </div>

    <div class="field-grid">
      <label v-for="field in fieldConfig" :key="field.key" class="field">
        <span class="field-label">{{ field.label }} <small>({{ field.suffix }})</small></span>
        <span class="input-wrap">
          <input
            :value="props.form[field.key] ?? ''"
            type="number"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            inputmode="decimal"
            :placeholder="`${field.min} - ${field.max}`"
            @input="update(field.key, ($event.target as HTMLInputElement).value)"
          />
          <span>{{ field.suffix }}</span>
        </span>
        <small class="field-help">{{ field.help }}</small>
      </label>
    </div>

    <p v-if="props.errorMessage" class="error-message" role="alert">{{ props.errorMessage }}</p>
    <button class="primary-button" type="submit">计算 DPS <span>→</span></button>
  </form>
</template>

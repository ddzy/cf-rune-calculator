<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue'
import ResultSummary from './components/ResultSummary.vue'
import ResultTable from './components/ResultTable.vue'
import { useRuneCalculator } from './composables/useRuneCalculator'

const { form, results, latest, errorMessage, calculateCurrent, resetForm, removeResult, clearHistory } = useRuneCalculator()
</script>

<template>
  <main class="page-shell">
    <header class="tool-header">
      <div class="tool-title">
        <p class="eyebrow">CF · Endless Challenge</p>
        <h1>无尽挑战符文计算器</h1>
        <p>快速比较不同符文配置下的 DPS。</p>
      </div>
      <div class="tool-meta"><span>PC / 移动端</span><span>支持离线使用</span></div>
    </header>

    <div class="main-grid">
      <CalculatorForm :form="form" :error-message="errorMessage" @calculate="calculateCurrent" @reset="resetForm" />
      <ResultSummary :result="latest" />
    </div>

    <ResultTable :results="results" @remove="removeResult" @clear="clearHistory" />
    <footer><span>数据只保存在当前设备</span><a href="https://github.com/ddzy/cf-rune-calculator" target="_blank" rel="noopener noreferrer">查看项目源码 ↗</a></footer>
  </main>
</template>

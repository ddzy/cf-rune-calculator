<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue'
import ResultSummary from './components/ResultSummary.vue'
import ResultTable from './components/ResultTable.vue'
import { useRuneCalculator } from './composables/useRuneCalculator'

const { form, results, latest, errorMessage, calculateCurrent, resetForm, removeResult, clearHistory } = useRuneCalculator()
</script>

<template>
  <main class="page-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">CF · Endless Challenge</p>
        <h1>无尽挑战<br /><em>符文计算器</em></h1>
        <p class="hero-copy">快速比较不同符文配置下的 DPS，找到更适合你的搭配。</p>
      </div>
      <div class="hero-meta"><span>PC / Mobile</span><span>纯静态运行</span></div>
    </header>

    <div class="main-grid">
      <CalculatorForm :form="form" :error-message="errorMessage" @calculate="calculateCurrent" @reset="resetForm" />
      <ResultSummary :result="latest" />
    </div>

    <ResultTable :results="results" @remove="removeResult" @clear="clearHistory" />
    <footer><span>数据只保存在当前设备</span><a href="https://github.com/ddzy/cf-rune-calculator" target="_blank" rel="noopener noreferrer">查看项目源码 ↗</a></footer>
  </main>
</template>

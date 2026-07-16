<script setup lang="ts">
import type { CalculationResult } from '../types/calculator'
defineProps<{ result: CalculationResult | null }>()
</script>

<template>
  <section class="summary panel" aria-labelledby="summary-title">
    <div><p class="eyebrow">Latest result</p><h2 id="summary-title">本次计算结果</h2></div>
    <template v-if="result">
      <div class="summary-values"><div><span>总 DPS</span><strong>{{ result.totalResult }}</strong></div><div><span>红色 DPS</span><strong>{{ result.legacyResult }}</strong></div></div>
      <p class="summary-note">总 DPS 已综合紫色主武器、黑骑士和玩偶因素。</p>
    </template>
    <p v-else class="summary-placeholder">完成一次计算后，这里会显示结果摘要。</p>
  </section>
</template>

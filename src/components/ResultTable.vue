<script setup lang="ts">
import type { CalculationResult } from '../types/calculator'

defineProps<{ results: CalculationResult[] }>()
const emit = defineEmits<{ remove: [id: string]; clear: [] }>()

const columns = [
  ['arms', '武伤'], ['rate', '爆率'], ['crit', '爆伤'], ['main', '紫色'], ['black', '黑骑士'], ['doll', '玩偶'],
] as const
</script>

<template>
  <section class="history-panel panel" aria-labelledby="history-title">
    <div class="section-heading">
      <div><p class="eyebrow">Calculation history</p><h2 id="history-title">计算记录</h2></div>
      <div class="heading-actions"><span class="result-count">{{ results.length }} 条</span><button v-if="results.length" class="text-button" type="button" @click="emit('clear')">清空</button></div>
    </div>
    <div v-if="results.length" class="table-scroll">
      <table>
        <thead><tr><th>#</th><th v-for="[, label] in columns" :key="label">{{ label }}</th><th>红色 DPS</th><th>总 DPS</th><th><span class="sr-only">操作</span></th></tr></thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="result.id">
            <td>{{ results.length - index }}</td>
            <td v-for="[key] in columns" :key="key">{{ result[key] }}</td>
            <td>{{ result.legacyResult }}</td><td class="total-cell">{{ result.totalResult }}</td>
            <td><button class="icon-button" type="button" aria-label="删除这条记录" @click="emit('remove', result.id)">×</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="empty-state"><span>⌁</span><p>还没有计算记录</p><small>填写上方参数后，结果会自动保存在当前设备。</small></div>
  </section>
</template>

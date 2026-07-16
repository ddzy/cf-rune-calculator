export const runeConfig = {
  blackRuneRate: 0.045,
  dollRuneRate: 0.03,
  baseCritRate: 0.03,
  blackBase: 1.045,
  totalCritBase: 2.5,
  legacyCritBase: 1.5,
} as const

export const fieldConfig = [
  { key: 'arms', label: '武伤', suffix: '%', min: 0, max: 1000, step: 0.1, help: '红色符文武器伤害' },
  { key: 'rate', label: '爆率', suffix: '%', min: 0, max: 100, step: 0.1, help: '红色符文暴击率' },
  { key: 'crit', label: '爆伤', suffix: '%', min: 0, max: 2000, step: 0.1, help: '红色符文暴击伤害' },
  { key: 'main', label: '紫色主武器', suffix: '%', min: 0, max: 200, step: 0.1, help: '紫色符文主武器数值' },
  { key: 'black', label: '黑骑士', suffix: '个', min: 0, max: 6, step: 1, help: '黑骑士数量' },
  { key: 'doll', label: '玩偶', suffix: '个', min: 0, max: 6, step: 1, help: '玩偶数量' },
] as const

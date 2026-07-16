# CF 无尽挑战符文计算器

CF 无尽挑战符文计算器网页版，支持 PC 和移动端，用于比较不同符文配置下的 DPS。

在线使用：[https://cf-rune.yyge.top](https://cf-rune.yyge.top)

## 开发

项目使用 Vite、Vue 3、TypeScript 和 SCSS 构建，计算数据只保存在当前设备的浏览器本地存储中，不需要后端服务。项目已配置 PWA，可安装到主屏幕，并在首次访问后支持离线打开。

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm type-check
pnpm build
pnpm preview
```

## 计算说明

- 武伤、爆率、爆伤、紫色主武器按百分数输入，例如 `60` 表示 `60%`。
- 黑骑士和玩偶按数量输入，当前支持 `0-6` 个。
- “红色 DPS”保留旧版本的纯红色符文计算结果。
- “总 DPS”会综合紫色主武器、黑骑士和玩偶因素。

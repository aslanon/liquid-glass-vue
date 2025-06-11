# 🌊 Liquid Glass Vue

Apple's Liquid Glass effect implementation for Vue 3 + Nuxt 3. A liquid glass component with real-time displacement mapping, chromatic aberration, and glassmorphism effects.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

## 🚀 Installation

```bash
npm install @aslanon/@aslanon/liquid-glass-vue
# or
yarn add @aslanon/@aslanon/liquid-glass-vue
# or
pnpm add @aslanon/@aslanon/liquid-glass-vue
```

## 🔗 Links

- **GitHub Repository**: [https://github.com/aslanon/@aslanon/liquid-glass-vue](https://github.com/aslanon/@aslanon/liquid-glass-vue)
- **NPM Package**: [https://www.npmjs.com/package/@aslanon/liquid-glass-vue](https://www.npmjs.com/package/@aslanon/liquid-glass-vue)
- **Issues**: [https://github.com/aslanon/@aslanon/liquid-glass-vue/issues](https://github.com/aslanon/@aslanon/liquid-glass-vue/issues)

## 📖 Usage

### Basic Usage

```vue
<template>
	<LiquidGlass>
		<div class="p-6">
			<h2>Your Content</h2>
			<p>This content will have liquid glass effect</p>
		</div>
	</LiquidGlass>
</template>

<script setup>
import { LiquidGlass } from "@aslanon/liquid-glass-vue";
</script>
```

### With Custom Props

```vue
<template>
	<LiquidGlass
		:displacement-scale="100"
		:blur-amount="0.5"
		:saturation="150"
		:aberration-intensity="3"
		:elasticity="0.2"
		:corner-radius="20"
		:over-light="false"
		mode="standard"
	>
		<YourContent />
	</LiquidGlass>
</template>

<script setup>
import { LiquidGlass } from "@aslanon/liquid-glass-vue";
</script>
```

### Global Mouse Tracking

```vue
<template>
	<div @mousemove="updateMousePos">
		<LiquidGlass :global-mouse-pos="globalMouse"> Content 1 </LiquidGlass>

		<LiquidGlass :global-mouse-pos="globalMouse"> Content 2 </LiquidGlass>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { LiquidGlass } from "@aslanon/liquid-glass-vue";

const globalMouse = ref({ x: 0, y: 0 });

const updateMousePos = (e) => {
	globalMouse.value = { x: e.clientX, y: e.clientY };
};
</script>
```

## ⚙️ Props

| Prop                  | Type                     | Default       | Description                                 |
| --------------------- | ------------------------ | ------------- | ------------------------------------------- |
| `displacementScale`   | `number`                 | `70`          | Displacement effect intensity (0-200)       |
| `blurAmount`          | `number`                 | `0.0625`      | Background blur amount (0-1)                |
| `saturation`          | `number`                 | `140`         | Color saturation percentage (100-300)       |
| `aberrationIntensity` | `number`                 | `2`           | Chromatic aberration intensity (0-20)       |
| `elasticity`          | `number`                 | `0.15`        | Mouse interaction elasticity (0-1)          |
| `cornerRadius`        | `number`                 | `999`         | Corner roundness (0-100, 999=fully rounded) |
| `overLight`           | `boolean`                | `false`       | Dark tint for light backgrounds             |
| `mode`                | `'standard' \| 'polar'`  | `'standard'`  | Displacement pattern mode                   |
| `globalMousePos`      | `{x: number, y: number}` | `undefined`   | External mouse position                     |
| `mouseOffset`         | `{x: number, y: number}` | `undefined`   | External mouse offset                       |
| `mouseContainer`      | `HTMLElement`            | `undefined`   | Mouse tracking container                    |
| `className`           | `string`                 | `''`          | Additional CSS classes                      |
| `padding`             | `string`                 | `'24px 32px'` | Internal padding                            |
| `style`               | `object`                 | `{}`          | Additional style properties                 |

## 🎨 Usage Scenarios

### Dark Background (Normal Glass)

```vue
<LiquidGlass :over-light="false">
  <!-- Transparent glass effect for dark backgrounds -->
</LiquidGlass>
```

### Light Background (Dark Tint)

```vue
<LiquidGlass :over-light="true">
  <!-- Dark glass effect for light backgrounds -->
</LiquidGlass>
```

## 🛠️ TypeScript Support

This package includes full TypeScript support with type definitions.

```typescript
import type {
	LiquidGlassProps,
	MousePosition,
} from "@aslanon/liquid-glass-vue";
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/aslanon/@aslanon/liquid-glass-vue](https://github.com/aslanon/@aslanon/liquid-glass-vue)
- **NPM Package**: [https://www.npmjs.com/package/@aslanon/liquid-glass-vue](https://www.npmjs.com/package/@aslanon/liquid-glass-vue)
- **Issues**: [https://github.com/aslanon/@aslanon/liquid-glass-vue/issues](https://github.com/aslanon/@aslanon/liquid-glass-vue/issues)

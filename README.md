# 🌊 Liquid Glass Vue

Apple's Liquid Glass effect implementation for Vue 3 + Nuxt 3. A liquid glass component with real-time displacement mapping, chromatic aberration, and glassmorphism effects.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

## 🌐 Demo

**[🚀 Live Demo](https://aslanon.github.io/liquid-glass-vue/)**

## 🚀 Installation

```bash
npm install @aslanonur/liquid-glass-vue
# or
yarn add @aslanonur/liquid-glass-vue
# or
pnpm add @aslanonur/liquid-glass-vue
```

## 🔗 Links

- **GitHub Repository**: [https://github.com/aslanon/liquid-glass-vue](https://github.com/aslanon/liquid-glass-vue)
- **NPM Package**: [https://www.npmjs.com/package/@aslanonur/liquid-glass-vue](https://www.npmjs.com/package/@aslanonur/liquid-glass-vue)
- **Issues**: [https://github.com/aslanon/liquid-glass-vue/issues](https://github.com/aslanon/liquid-glass-vue/issues)

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
import { LiquidGlass } from "@aslanonur/liquid-glass-vue";
</script>
```

### Button Mode

```vue
<template>
	<!-- Clickable Button -->
	<LiquidGlass :on-click="handleClick" :elasticity="0.8" padding="16px 24px">
		<div class="flex items-center gap-2">
			<Icon name="arrow-right" />
			<span>Click Me</span>
		</div>
	</LiquidGlass>

	<!-- Inline Buttons -->
	<div class="flex gap-3">
		<LiquidGlass
			:on-click="() => save()"
			:corner-radius="20"
			padding="12px 20px"
		>
			<span>Save</span>
		</LiquidGlass>

		<LiquidGlass
			:on-click="() => cancel()"
			:corner-radius="20"
			padding="12px 20px"
		>
			<span>Cancel</span>
		</LiquidGlass>
	</div>
</template>

<script setup>
import { LiquidGlass } from "@aslanonur/liquid-glass-vue";

const handleClick = () => {
	console.log("Button clicked!");
};

const save = () => {
	// Save logic
};

const cancel = () => {
	// Cancel logic
};
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
import { LiquidGlass } from "@aslanonur/liquid-glass-vue";
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
import { LiquidGlass } from "@aslanonur/liquid-glass-vue";

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
| `positioning`         | `'fixed' \| 'relative'`  | `'relative'`  | Positioning mode (fixed or relative)        |
| `onClick`             | `() => void`             | `undefined`   | Click handler (enables button mode)         |
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

### Button Mode Features

When you provide an `onClick` prop, the component automatically enables button mode with:

- **Hover Effects**: Subtle glow and highlight effects on hover
- **Active States**: Visual feedback when pressed
- **Cursor Pointer**: Automatic cursor change to indicate clickability
- **Enhanced Elasticity**: More responsive mouse interactions
- **Multiple Border Layers**: Advanced visual depth with screen and overlay blend modes

```vue
<template>
	<!-- Button with enhanced effects -->
	<LiquidGlass :on-click="handleClick" :elasticity="0.8" :over-light="false">
		<span>Interactive Button</span>
	</LiquidGlass>

	<!-- Over light button -->
	<LiquidGlass :on-click="handleClick" :over-light="true">
		<span>Over Light Button</span>
	</LiquidGlass>
</template>
```

### Relative Positioning (Inline Elements)

```vue
<template>
	<div class="flex gap-4">
		<LiquidGlass positioning="relative" class="inline-block">
			<button>Save</button>
		</LiquidGlass>

		<LiquidGlass positioning="relative" class="inline-block">
			<button>Cancel</button>
		</LiquidGlass>
	</div>
</template>
```

### Fixed Positioning (Overlay Elements)

```vue
<LiquidGlass
	positioning="fixed"
	:style="{ top: '50%', left: '50%', zIndex: 50 }"
>
  <!-- Centered overlay content -->
</LiquidGlass>
```

## 🛠️ TypeScript Support

This package includes full TypeScript support with type definitions.

```typescript
import type {
	LiquidGlassProps,
	MousePosition,
} from "@aslanonur/liquid-glass-vue";
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/aslanon/liquid-glass-vue](https://github.com/aslanon/liquid-glass-vue)
- **NPM Package**: [https://www.npmjs.com/package/@aslanonur/liquid-glass-vue](https://www.npmjs.com/package/@aslanonur/liquid-glass-vue)
- **Issues**: [https://github.com/aslanon/liquid-glass-vue/issues](https://github.com/aslanon/liquid-glass-vue/issues)

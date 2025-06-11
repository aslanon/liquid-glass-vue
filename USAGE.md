# 🚀 Liquid Glass Vue - Usage Guide

## 🔗 Links

- **GitHub Repository**: [https://github.com/aslanonur/@aslanonurur/liquid-glass-vue](https://github.com/aslanonur/@aslanonurur/liquid-glass-vue)
- **NPM Package**: [https://www.npmjs.com/package/@aslanonurur/liquid-glass-vue](https://www.npmjs.com/package/@aslanonurur/liquid-glass-vue)
- **Issues**: [https://github.com/aslanonur/@aslanonurur/liquid-glass-vue/issues](https://github.com/aslanonur/@aslanonurur/liquid-glass-vue/issues)

## Installation

```bash
npm install @aslanonurur/liquid-glass-vue
# or
yarn add @aslanonurur/liquid-glass-vue
# or
pnpm add @aslanonurur/liquid-glass-vue
```

## Basic Usage in Vue 3

```vue
<template>
	<div>
		<LiquidGlass>
			<div class="p-6">
				<h2>Hello World</h2>
				<p>This content has liquid glass effect!</p>
			</div>
		</LiquidGlass>
	</div>
</template>

<script setup>
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";
</script>
```

## Usage in Nuxt 3

### 1. Install the package

```bash
npm install @aslanonurur/liquid-glass-vue
```

### 2. Create a plugin (optional for auto-import)

Create `plugins/liquid-glass.client.ts`:

```typescript
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";

export default defineNuxtPlugin(() => {
	return {
		provide: {
			LiquidGlass,
		},
	};
});
```

### 3. Use in your components

```vue
<template>
	<div>
		<LiquidGlass :displacement-scale="100" :over-light="true">
			<div class="p-8">
				<h1>Nuxt 3 + Liquid Glass</h1>
				<p>Beautiful glass effect in Nuxt!</p>
			</div>
		</LiquidGlass>
	</div>
</template>

<script setup>
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";
</script>
```

## Advanced Examples

### Global Mouse Tracking

```vue
<template>
	<div @mousemove="updateGlobalMouse" class="min-h-screen">
		<LiquidGlass :global-mouse-pos="globalMouse" class="mb-8">
			<div class="p-6">Component 1</div>
		</LiquidGlass>

		<LiquidGlass :global-mouse-pos="globalMouse">
			<div class="p-6">Component 2</div>
		</LiquidGlass>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";

const globalMouse = ref({ x: 0, y: 0 });

const updateGlobalMouse = (e: MouseEvent) => {
	globalMouse.value = { x: e.clientX, y: e.clientY };
};
</script>
```

### Customized Effects

```vue
<template>
	<div class="space-y-8">
		<!-- Subtle effect for light backgrounds -->
		<LiquidGlass
			:displacement-scale="50"
			:aberration-intensity="1"
			:blur-amount="0.1"
			:elasticity="0.1"
			:over-light="true"
		>
			<div class="p-6 bg-white/10">
				<h3>Subtle Glass</h3>
			</div>
		</LiquidGlass>

		<!-- Dramatic effect for dark backgrounds -->
		<LiquidGlass
			:displacement-scale="150"
			:aberration-intensity="5"
			:blur-amount="0.8"
			:elasticity="0.3"
			mode="polar"
		>
			<div class="p-6">
				<h3>Dramatic Glass</h3>
			</div>
		</LiquidGlass>
	</div>
</template>

<script setup>
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";
</script>
```

### With TypeScript

```vue
<template>
	<LiquidGlass
		:displacement-scale="settings.displacement"
		:aberration-intensity="settings.aberration"
		:over-light="settings.overLight"
		@click="handleClick"
	>
		<div class="p-6">
			<h3>TypeScript Example</h3>
		</div>
	</LiquidGlass>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";
import type { LiquidGlassProps } from "@aslanonurur/liquid-glass-vue";

interface Settings {
	displacement: number;
	aberration: number;
	overLight: boolean;
}

const settings = ref<Settings>({
	displacement: 70,
	aberration: 2,
	overLight: false,
});

const handleClick = () => {
	console.log("Glass clicked!");
};
</script>
```

## Composable Usage

```vue
<script setup>
import { useLiquidGlass } from "@aslanonurur/liquid-glass-vue";

const { displacementMap, polarDisplacementMap, generateId } = useLiquidGlass();

// Use the displacement maps or utilities as needed
console.log("Generated ID:", generateId());
</script>
```

## CSS Integration

The component works well with TailwindCSS and other CSS frameworks:

```vue
<template>
	<LiquidGlass class="rounded-xl shadow-2xl">
		<div class="p-8 text-white">
			<h2 class="text-2xl font-bold mb-4">Beautiful Card</h2>
			<p class="opacity-90">With TailwindCSS styling</p>
		</div>
	</LiquidGlass>
</template>
```

## Performance Tips

1. **Limit simultaneous components**: Use max 3-4 components at once
2. **Reduce elasticity**: Lower values (0.1) for better performance
3. **Global mouse tracking**: Share mouse position between components
4. **Disable on mobile**: Consider disabling effects on touch devices

```vue
<script setup>
import { computed } from "vue";
import { LiquidGlass } from "@aslanonurur/liquid-glass-vue";

const isMobile = computed(() => {
	return typeof window !== "undefined" && window.innerWidth < 768;
});

const glassProps = computed(() => ({
	displacementScale: isMobile.value ? 0 : 70,
	elasticity: isMobile.value ? 0 : 0.15,
}));
</script>
```

## Troubleshooting

### Effects not working on initial load

- Ensure mouse position is not (0,0)
- Add a small delay or use `nextTick()`

### Performance issues

- Reduce `elasticity` value
- Lower `displacementScale`
- Limit number of components

### TypeScript errors

- Make sure to import types: `import type { LiquidGlassProps } from '@aslanonurur/liquid-glass-vue'`
- Check that Vue 3 types are properly installed

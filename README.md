# 🌊 Liquid Glass Vue

Apple's Liquid Glass effect implementation for Vue 3 + Nuxt 3. A liquid glass component for modern web applications with real-time displacement mapping, chromatic aberration, and glassmorphism effects.

![Liquid Glass Vue Demo](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## ✨ Features

- 🎨 **Real-time Effects**: Displacement mapping and chromatic aberration
- 🖱️ **Mouse Tracking**: Elastic transformations and interactive animations
- 🌓 **Dual Mode**: Optimized modes for light and dark backgrounds
- 🎛️ **Full Control**: All parameters are customizable
- 📱 **Responsive**: Perfect performance on all devices
- 🔧 **TypeScript**: Full type safety
- ⚡ **Vue 3**: Modern development with Composition API
- 🚀 **Nuxt 3**: SSR and performance optimizations

## 🎯 Demo

```bash
npm run dev
```

Open `http://localhost:3000` in your browser and explore two different usage scenarios:

- **🌟 Normal Glass**: Transparent glass effect for dark backgrounds
- **🌙 Dark Tint**: Dark glass effect for light backgrounds

## 🚀 Installation

### Requirements

- Node.js 18+
- npm or yarn

### Steps

```bash
# Clone the project
git clone https://github.com/your-username/liquid-glass-vue.git
cd liquid-glass-vue

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## 📖 Usage

### Basic Usage

```vue
<template>
	<LiquidGlass>
		<div class="p-6">
			<h2>Liquid Glass Content</h2>
			<p>This content will be wrapped with glass effect</p>
		</div>
	</LiquidGlass>
</template>

<script setup>
import LiquidGlass from "~/components/LiquidGlass.vue";
</script>
```

### Advanced Usage

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
		:global-mouse-pos="mousePos"
		@click="handleClick"
	>
		<YourContent />
	</LiquidGlass>
</template>

<script setup>
import { ref } from "vue";
import LiquidGlass from "~/components/LiquidGlass.vue";

const mousePos = ref({ x: 0, y: 0 });

const handleClick = () => {
	console.log("Liquid glass clicked!");
};
</script>
```

## ⚙️ API Reference

### Props

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

### Events

| Event         | Description                 |
| ------------- | --------------------------- |
| `@click`      | When component is clicked   |
| `@mouseenter` | When mouse enters component |
| `@mouseleave` | When mouse leaves component |
| `@mousedown`  | When mouse is pressed       |
| `@mouseup`    | When mouse is released      |

## 🎨 Usage Scenarios

### 1. Dark Background (Normal Glass)

```vue
<LiquidGlass :over-light="false">
	<!-- Transparent glass effect for dark backgrounds -->
</LiquidGlass>
```

### 2. Light Background (Dark Tint)

```vue
<LiquidGlass :over-light="true">
	<!-- Dark glass effect for light backgrounds -->
</LiquidGlass>
```

### 3. Customized Effect

```vue
<LiquidGlass
	:displacement-scale="150"
	:aberration-intensity="5"
	mode="polar"
	:elasticity="0.3"
>
	<!-- Dramatic appearance with strong effects -->
</LiquidGlass>
```

### 4. Global Mouse Tracking

```vue
<template>
	<div @mousemove="updateMousePos">
		<LiquidGlass :global-mouse-pos="globalMouse"> Content 1 </LiquidGlass>

		<LiquidGlass :global-mouse-pos="globalMouse"> Content 2 </LiquidGlass>
	</div>
</template>

<script setup>
const globalMouse = ref({ x: 0, y: 0 });

const updateMousePos = (e) => {
	globalMouse.value = { x: e.clientX, y: e.clientY };
};
</script>
```

## 🛠️ Tech Stack

- **Vue 3**: Modern reactive framework with Composition API
- **Nuxt 3**: Full-stack Vue framework
- **TypeScript**: Type safety and developer experience
- **TailwindCSS**: Utility-first CSS framework
- **SVG Filters**: Real-time displacement and aberration effects

## 🎯 Performance

- **SVG Filter Optimization**: Efficient filter rendering
- **Reactive Updates**: Only necessary updates
- **Memory Management**: Automatic cleanup and garbage collection
- **Browser Compatibility**: Optimized for modern browsers

## 🔧 Development

### Project Structure

```
liquid-glass-vue/
├── components/
│   └── LiquidGlass.vue      # Main component
├── composables/
│   └── useLiquidGlass.ts    # Utility functions
├── pages/
│   └── index.vue            # Demo page
├── assets/
│   └── css/
│       └── main.css         # Global styles
└── nuxt.config.ts           # Nuxt configuration
```

### Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Preview
npm run preview
```

## 🐛 Troubleshooting

### SVG Filter Issues

If displacement or aberration effects are not working:

1. Check console logs in browser developer tools
2. Ensure SVG filter IDs are unique
3. Make sure the component is mounted

### Performance Issues

- Lower the `elasticity` value (0.1 or less)
- Reduce `displacementScale` value
- Avoid using too many components simultaneously

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

⭐ If you like this project, don't forget to give it a star!

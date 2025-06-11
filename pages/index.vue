<template>
	<div
		class="grid shadow-2xl max-w-[600px] w-full mx-auto h-screen rounded-3xl"
	>
		<!-- Left Panel - Scroll Area with Images -->
		<div class="w-full top-0 left-0">
			<img
				src="https://picsum.photos/2000/1200?random=1"
				class="w-full h-[600px] object-cover"
			/>

			<img
				src="https://picsum.photos/2000/1200?random=2"
				class="w-full h-[600px] object-cover"
			/>
			<img
				src="https://picsum.photos/2000/1200?random=3"
				class="w-full h-[600px] object-cover"
			/>
			<img
				src="https://picsum.photos/2000/1200?random=4"
				class="w-full h-[600px] object-cover"
			/>
			<img
				src="https://picsum.photos/2000/1200?random=5"
				class="w-full h-[600px] object-cover"
			/>
			<img
				src="https://picsum.photos/2000/1200?random=6"
				class="w-full h-[600px] object-cover"
			/>

			<!-- Component 1: Dark Background (Normal Glass) -->
			<LiquidGlass
				:displacement-scale="settings.displacementScale"
				:blur-amount="settings.blurAmount"
				:saturation="settings.saturation"
				:aberration-intensity="settings.aberrationIntensity"
				:elasticity="settings.elasticity"
				:corner-radius="settings.cornerRadius"
				:mouse-container="containerRef"
				:over-light="false"
				:mode="settings.mode"
				:style="{
					position: 'fixed',
					top: '20%',
					left: '50%',
					zIndex: 50,
				}"
			>
				<div class="px-8 py-4">
					<div class="flex items-center gap-3 mb-2">
						<div
							class="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
						>
							<svg
								class="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						</div>
						<span class="text-lg font-semibold text-white">Normal Glass</span>
					</div>
					<p class="text-sm text-white/80">Dark background</p>
				</div>
			</LiquidGlass>

			<!-- Component 2: Light Background (Dark Tint) -->
			<LiquidGlass
				:displacement-scale="settings.displacementScale"
				:blur-amount="settings.blurAmount"
				:saturation="settings.saturation"
				:aberration-intensity="settings.aberrationIntensity"
				:elasticity="settings.elasticity"
				:corner-radius="settings.cornerRadius"
				:mouse-container="containerRef"
				:over-light="true"
				:mode="settings.mode"
				:style="{
					position: 'fixed',
					top: '35%',
					left: '50%',
					zIndex: 50,
				}"
			>
				<div class="px-8 py-4">
					<div class="flex items-center gap-3 mb-2">
						<div
							class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
						>
							<svg
								class="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<span class="text-lg font-semibold text-white">Dark Tint</span>
					</div>
					<p class="text-sm text-white/80">Light background</p>
				</div>
			</LiquidGlass>
		</div>

		<!-- Right Panel - Simple Controls -->
		<div
			class="col-start-3 fixed left-8 top-8 rounded-3xl bg-black overflow-y-auto backdrop-blur-md border-l border-white/10 p-6 flex flex-col"
		>
			<div class="mb-8 w-[300px]">
				<p class="text-white/60 mb-2 text-right text-sm">
					<a href="https://github.com/aslanon/liquid-glass-vue">GitHub Repo</a>
				</p>
				<h2 class="text-2xl font-bold text-white mb-2">Liquid Glass</h2>
			</div>

			<div class="space-y-6 flex-1">
				<!-- Displacement Scale -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Displacement Scale
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-blue-300">{{
							settings.displacementScale
						}}</span>
					</div>
					<input
						type="range"
						min="0"
						max="200"
						step="1"
						v-model.number="settings.displacementScale"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Displacement intensity</p>
				</div>

				<!-- Aberration Intensity -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Aberration Intensity
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-purple-300">{{
							settings.aberrationIntensity
						}}</span>
					</div>
					<input
						type="range"
						min="0"
						max="20"
						step="1"
						v-model.number="settings.aberrationIntensity"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Chromatic aberration</p>
				</div>

				<!-- Blur Amount -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Blur Amount
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-green-300">{{
							settings.blurAmount.toFixed(2)
						}}</span>
					</div>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						v-model.number="settings.blurAmount"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Background blur</p>
				</div>

				<!-- Saturation -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Saturation
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-yellow-300"
							>{{ settings.saturation }}%</span
						>
					</div>
					<input
						type="range"
						min="100"
						max="300"
						step="10"
						v-model.number="settings.saturation"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Color saturation</p>
				</div>

				<!-- Elasticity -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Elasticity
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-pink-300">{{
							settings.elasticity.toFixed(2)
						}}</span>
					</div>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						v-model.number="settings.elasticity"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Mouse interaction</p>
				</div>

				<!-- Corner Radius -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-2">
						Corner Radius
					</label>
					<div class="mb-2">
						<span class="text-xl font-mono text-orange-300">
							{{
								settings.cornerRadius === 999
									? "Full"
									: `${settings.cornerRadius}px`
							}}
						</span>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						step="1"
						v-model.number="settings.cornerRadius"
						class="w-full slider"
					/>
					<p class="text-xs text-white/50 mt-1">Border radius</p>
				</div>

				<!-- Mode Toggle -->
				<div>
					<label class="block text-sm font-semibold text-white/90 mb-3">
						Displacement Mode
					</label>
					<div class="space-y-2">
						<div class="flex items-center space-x-3">
							<input
								type="radio"
								id="modeStandard"
								name="mode"
								value="standard"
								v-model="settings.mode"
								class="w-4 h-4 accent-blue-500"
							/>
							<label for="modeStandard" class="text-sm text-white/90">
								Standard
							</label>
						</div>
						<div class="flex items-center space-x-3">
							<input
								type="radio"
								id="modePolar"
								name="mode"
								value="polar"
								v-model="settings.mode"
								class="w-4 h-4 accent-blue-500"
							/>
							<label for="modePolar" class="text-sm text-white/90">
								Polar
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LiquidGlass from "~/components/LiquidGlass.vue";

// Container ref for mouse tracking
const containerRef = ref<HTMLElement>();

// Single settings object that controls both components
const settings = ref({
	displacementScale: 70,
	blurAmount: 0.0625,
	saturation: 140,
	aberrationIntensity: 2,
	elasticity: 0.15,
	cornerRadius: 999,
	mode: "standard" as "standard" | "polar",
});

useHead({
	title: "Liquid Glass Vue - Simple Demo",
});
</script>

<style scoped>
.slider {
	-webkit-appearance: none;
	appearance: none;
	height: 6px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 3px;
	outline: none;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 18px;
	height: 18px;
	background: linear-gradient(45deg, #3b82f6, #8b5cf6);
	border-radius: 50%;
	cursor: pointer;
	border: 2px solid white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
	width: 18px;
	height: 18px;
	background: linear-gradient(45deg, #3b82f6, #8b5cf6);
	border-radius: 50%;
	cursor: pointer;
	border: 2px solid white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>

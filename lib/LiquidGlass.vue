<template>
	<div>
		<!-- Over light effect - React'teki exact pattern -->
		<div
			:class="`bg-black transition-all duration-150 ease-in-out pointer-events-none ${
				props.overLight ? 'opacity-20' : 'opacity-0'
			}`"
			:style="{
				...positionStyles,
				height: glassSize.height + 'px',
				width: 'auto',
				borderRadius: `${props.cornerRadius}px`,
				transform: baseStyle.transform,
				transition: baseStyle.transition,
			}"
		/>

		<!-- Glass Container -->
		<div
			ref="glassRef"
			:class="`relative ${props.className} ${active ? 'active' : ''} ${
				Boolean(props.onClick) ? 'cursor-pointer' : ''
			}`"
			:style="baseStyle"
			@click="props.onClick"
		>
			<!-- React'teki exact SVG Filter structure -->
			<svg
				:key="`svg-${filterId}-${filterKey}`"
				:style="{
					position: 'absolute',
					width: glassSize.width + 'px',
					height: glassSize.height + 'px',
				}"
				aria-hidden="true"
			>
				<defs>
					<!-- Radial gradient for edge mask -->
					<radialGradient
						:id="`${filterId}-edge-mask`"
						cx="50%"
						cy="50%"
						r="50%"
					>
						<stop offset="0%" stop-color="black" stop-opacity="0" />
						<stop
							:offset="`${Math.max(30, 80 - props.aberrationIntensity * 2)}%`"
							stop-color="black"
							stop-opacity="0"
						/>
						<stop offset="100%" stop-color="white" stop-opacity="1" />
					</radialGradient>

					<!-- Main filter - React'teki exact structure -->
					<filter
						:id="filterId"
						x="-35%"
						y="-35%"
						width="170%"
						height="170%"
						color-interpolation-filters="sRGB"
					>
						<!-- React'teki exact feImage kullanımı -->
						<feImage
							id="feimage"
							x="0"
							y="0"
							width="100%"
							height="100%"
							result="DISPLACEMENT_MAP"
							:href="
								props.mode === 'standard'
									? displacementMap
									: polarDisplacementMap
							"
							preserveAspectRatio="xMidYMid slice"
						/>

						<!-- Create edge mask using the displacement map itself -->
						<feColorMatrix
							in="DISPLACEMENT_MAP"
							type="matrix"
							values="0.3 0.3 0.3 0 0
									 0.3 0.3 0.3 0 0
									 0.3 0.3 0.3 0 0
									 0 0 0 1 0"
							result="EDGE_INTENSITY"
						/>
						<feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
							<feFuncA
								type="discrete"
								:tableValues="`0 ${props.aberrationIntensity * 0.05} 1`"
							/>
						</feComponentTransfer>

						<!-- Original undisplaced image for center -->
						<feOffset
							in="SourceGraphic"
							dx="0"
							dy="0"
							result="CENTER_ORIGINAL"
						/>

						<!-- Red channel displacement with slight offset -->
						<feDisplacementMap
							in="SourceGraphic"
							in2="DISPLACEMENT_MAP"
							:scale="effectiveDisplacementScale * -1"
							xChannelSelector="R"
							yChannelSelector="B"
							result="RED_DISPLACED"
						/>
						<feColorMatrix
							in="RED_DISPLACED"
							type="matrix"
							values="1 0 0 0 0
									 0 0 0 0 0
									 0 0 0 0 0
									 0 0 0 1 0"
							result="RED_CHANNEL"
						/>

						<!-- Green channel displacement -->
						<feDisplacementMap
							in="SourceGraphic"
							in2="DISPLACEMENT_MAP"
							:scale="
								effectiveDisplacementScale *
								(-1 - props.aberrationIntensity * 0.05)
							"
							xChannelSelector="R"
							yChannelSelector="B"
							result="GREEN_DISPLACED"
						/>
						<feColorMatrix
							in="GREEN_DISPLACED"
							type="matrix"
							values="0 0 0 0 0
									 0 1 0 0 0
									 0 0 0 0 0
									 0 0 0 1 0"
							result="GREEN_CHANNEL"
						/>

						<!-- Blue channel displacement with slight offset -->
						<feDisplacementMap
							in="SourceGraphic"
							in2="DISPLACEMENT_MAP"
							:scale="
								effectiveDisplacementScale *
								(-1 - props.aberrationIntensity * 0.1)
							"
							xChannelSelector="R"
							yChannelSelector="B"
							result="BLUE_DISPLACED"
						/>
						<feColorMatrix
							in="BLUE_DISPLACED"
							type="matrix"
							values="0 0 0 0 0
									 0 0 0 0 0
									 0 0 1 0 0
									 0 0 0 1 0"
							result="BLUE_CHANNEL"
						/>

						<!-- Combine all channels with screen blend mode for chromatic aberration -->
						<feBlend
							in="GREEN_CHANNEL"
							in2="BLUE_CHANNEL"
							mode="screen"
							result="GB_COMBINED"
						/>
						<feBlend
							in="RED_CHANNEL"
							in2="GB_COMBINED"
							mode="screen"
							result="RGB_COMBINED"
						/>

						<!-- Add slight blur to soften the aberration effect -->
						<feGaussianBlur
							in="RGB_COMBINED"
							:stdDeviation="
								Math.max(0.1, 0.5 - props.aberrationIntensity * 0.1)
							"
							result="ABERRATED_BLURRED"
						/>

						<!-- Apply edge mask to aberration effect -->
						<feComposite
							in="ABERRATED_BLURRED"
							in2="EDGE_MASK"
							operator="in"
							result="EDGE_ABERRATION"
						/>

						<!-- Create inverted mask for center -->
						<feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
							<feFuncA type="table" tableValues="1 0" />
						</feComponentTransfer>
						<feComposite
							in="CENTER_ORIGINAL"
							in2="INVERTED_MASK"
							operator="in"
							result="CENTER_CLEAN"
						/>

						<!-- Combine edge aberration with clean center -->
						<feComposite
							in="EDGE_ABERRATION"
							in2="CENTER_CLEAN"
							operator="over"
						/>
					</filter>
				</defs>
			</svg>

			<div
				class="glass"
				:style="{
					borderRadius: `${props.cornerRadius}px`,
					position: 'relative',
					display: 'inline-flex',
					alignItems: 'center',
					gap: '24px',
					padding,
					overflow: 'hidden',
					transition: 'all 0.2s ease-in-out',
					boxShadow: props.overLight
						? '0px 16px 70px rgba(0, 0, 0, 0.75), 0 4px 20px rgba(0, 0, 0, 0.5)'
						: '0px 12px 40px rgba(0, 0, 0, 0.25)',
				}"
				@mouseenter="handleMouseEnter"
				@mouseleave="handleMouseLeave"
				@mousedown="handleMouseDown"
				@mouseup="handleMouseUp"
			>
				<!-- backdrop layer that gets wiggly -->
				<span
					:key="`warp-${filterId}-${filterKey}`"
					class="glass__warp"
					:style="backdropStyle"
					:data-filter-url="`url(#${filterId})`"
					:data-backdrop-filter="backdropStyle.backdropFilter"
				/>

				<!-- user content stays sharp -->
				<div
					class="transition-all duration-150 ease-in-out text-white"
					:style="{
						position: 'relative',
						zIndex: 1,
						font: '500 20px/1 system-ui',
						textShadow: props.overLight
							? '0px 2px 12px rgba(0, 0, 0, 0.8)'
							: '0px 2px 12px rgba(0, 0, 0, 0.4)',
					}"
				>
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";

interface Props {
	displacementScale?: number;
	blurAmount?: number;
	saturation?: number;
	aberrationIntensity?: number;
	elasticity?: number;
	cornerRadius?: number;
	globalMousePos?: { x: number; y: number };
	mouseOffset?: { x: number; y: number };
	mouseContainer?: HTMLElement | null;
	className?: string;
	padding?: string;
	style?: Record<string, any>;
	overLight?: boolean;
	mode?: "standard" | "polar";
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onMouseDown?: () => void;
	onMouseUp?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
	displacementScale: 70,
	blurAmount: 0.0625,
	saturation: 140,
	aberrationIntensity: 2,
	elasticity: 0.15,
	cornerRadius: 999,
	className: "",
	padding: "24px 32px",
	overLight: false,
	style: () => ({}),
	mode: "standard",
});

const { displacementMap, polarDisplacementMap, generateId, isFirefox } =
	useLiquidGlass();

const glassRef = ref<HTMLElement>();
const isHovered = ref(false);
const active = ref(false);
const glassSize = ref({ width: 270, height: 69 });
const internalGlobalMousePos = ref({ x: 100, y: 100 });
const internalMouseOffset = ref({ x: 0, y: 0 });
const filterKey = ref(0);

const filterId = generateId();
console.log("Generated Filter ID:", filterId);

// Use external mouse position if provided, otherwise use internal
const globalMousePos = computed(
	() => props.globalMousePos || internalGlobalMousePos.value
);
const mouseOffset = computed(
	() => props.mouseOffset || internalMouseOffset.value
);

// Calculate displacement scale based on overLight prop (like React version)
const effectiveDisplacementScale = computed(() => {
	const result = props.overLight
		? props.displacementScale * 0.5
		: props.displacementScale;

	// Debug: React'teki değerleri kontrol et
	console.log("Vue Displacement Scale Debug:", {
		propsDisplacementScale: props.displacementScale, // LiquidGlass level (default: 70)
		overLight: props.overLight,
		effectiveScale: result, // GlassContainer level
		mode: props.mode,
		reactComparison: {
			liquidGlassDefault: 70,
			glassContainerDefault: 25,
			currentEffective: result,
		},
	});

	return result;
});

const backdropStyle = computed(() => {
	// Force reactivity with filterKey
	filterKey.value;

	const isFirefoxBrowser =
		process.client && navigator.userAgent.toLowerCase().includes("firefox");
	console.log("Firefox detection:", {
		isFirefoxBrowser,
		processClient: process.client,
		filterKey: filterKey.value,
	});

	const style: any = {
		position: "absolute" as const,
		inset: "0",
		backdropFilter: `blur(${
			(props.overLight ? 12 : 4) + props.blurAmount * 32
		}px) saturate(${props.saturation}%)`,
	};

	if (!isFirefoxBrowser) {
		style.filter = `url(#${filterId})`;
	}

	return style;
});

// Calculate directional scaling based on mouse position
const calculateDirectionalScale = () => {
	if (!globalMousePos.value.x || !globalMousePos.value.y || !glassRef.value) {
		return "scale(1)";
	}

	const rect = glassRef.value.getBoundingClientRect();
	const pillCenterX = rect.left + rect.width / 2;
	const pillCenterY = rect.top + rect.height / 2;
	const pillWidth = glassSize.value.width;
	const pillHeight = glassSize.value.height;

	const deltaX = globalMousePos.value.x - pillCenterX;
	const deltaY = globalMousePos.value.y - pillCenterY;

	// Calculate distance from mouse to pill edges (not center)
	const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
	const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
	const edgeDistance = Math.sqrt(
		edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY
	);

	// Activation zone: 200px from edges
	const activationZone = 200;

	// If outside activation zone, no effect
	if (edgeDistance > activationZone) {
		return "scale(1)";
	}

	// Calculate fade-in factor (1 at edge, 0 at activation zone boundary)
	const fadeInFactor = 1 - edgeDistance / activationZone;

	// Normalize the deltas for direction
	const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	if (centerDistance === 0) {
		return "scale(1)";
	}

	const normalizedX = deltaX / centerDistance;
	const normalizedY = deltaY / centerDistance;

	// Calculate stretch factors with fade-in
	const stretchIntensity =
		Math.min(centerDistance / 300, 1) * props.elasticity * fadeInFactor;

	// X-axis scaling: stretch horizontally when moving left/right, compress when moving up/down
	const scaleX =
		1 +
		Math.abs(normalizedX) * stretchIntensity * 0.3 -
		Math.abs(normalizedY) * stretchIntensity * 0.15;

	// Y-axis scaling: stretch vertically when moving up/down, compress when moving left/right
	const scaleY =
		1 +
		Math.abs(normalizedY) * stretchIntensity * 0.3 -
		Math.abs(normalizedX) * stretchIntensity * 0.15;

	return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
};

// Helper function to calculate fade-in factor based on distance from element edges
const calculateFadeInFactor = () => {
	if (!globalMousePos.value.x || !globalMousePos.value.y || !glassRef.value) {
		return 0;
	}

	const rect = glassRef.value.getBoundingClientRect();
	const pillCenterX = rect.left + rect.width / 2;
	const pillCenterY = rect.top + rect.height / 2;
	const pillWidth = glassSize.value.width;
	const pillHeight = glassSize.value.height;

	const edgeDistanceX = Math.max(
		0,
		Math.abs(globalMousePos.value.x - pillCenterX) - pillWidth / 2
	);
	const edgeDistanceY = Math.max(
		0,
		Math.abs(globalMousePos.value.y - pillCenterY) - pillHeight / 2
	);
	const edgeDistance = Math.sqrt(
		edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY
	);

	const activationZone = 200;
	return edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone;
};

// Helper function to calculate elastic translation
const calculateElasticTranslation = () => {
	if (!glassRef.value) {
		return { x: 0, y: 0 };
	}

	const fadeInFactor = calculateFadeInFactor();
	const rect = glassRef.value.getBoundingClientRect();
	const pillCenterX = rect.left + rect.width / 2;
	const pillCenterY = rect.top + rect.height / 2;

	return {
		x:
			(globalMousePos.value.x - pillCenterX) *
			props.elasticity *
			0.1 *
			fadeInFactor,
		y:
			(globalMousePos.value.y - pillCenterY) *
			props.elasticity *
			0.1 *
			fadeInFactor,
	};
};

const transformStyle = computed(() => {
	const translation = calculateElasticTranslation();
	return `translate(calc(-50% + ${translation.x}px), calc(-50% + ${
		translation.y
	}px)) ${
		active.value && props.onClick ? "scale(0.96)" : calculateDirectionalScale()
	}`;
});

const baseStyle = computed(() => ({
	...props.style,
	transform: transformStyle.value,
	transition: "all ease-out 0.2s",
}));

const positionStyles = computed(() => ({
	position: (baseStyle.value as any).position || "relative",
	top: (baseStyle.value as any).top || "50%",
	left: (baseStyle.value as any).left || "50%",
}));

// Internal mouse tracking
const handleMouseMove = (e: MouseEvent) => {
	const container = props.mouseContainer || glassRef.value;
	if (!container) return;

	const rect = container.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;

	internalMouseOffset.value = {
		x: ((e.clientX - centerX) / rect.width) * 100,
		y: ((e.clientY - centerY) / rect.height) * 100,
	};

	internalGlobalMousePos.value = {
		x: e.clientX,
		y: e.clientY,
	};
};

// Update glass size
const updateGlassSize = () => {
	if (glassRef.value) {
		const rect = glassRef.value.getBoundingClientRect();
		glassSize.value = { width: rect.width, height: rect.height };
	}
};

const handleMouseEnter = () => {
	isHovered.value = true;
};

const handleMouseLeave = () => {
	isHovered.value = false;
};

const handleMouseDown = () => {
	active.value = true;
};

const handleMouseUp = () => {
	active.value = false;
};

// Watch for prop changes and force filter refresh
watch(
	[
		() => props.displacementScale,
		() => props.aberrationIntensity,
		() => props.mode,
	],
	() => {
		console.log("Props changed, forcing filter refresh...");
		filterKey.value++; // Force reactivity

		if (process.client && glassRef.value) {
			nextTick(() => {
				const glassElement = glassRef.value?.querySelector(".glass__warp");
				if (glassElement) {
					// Force reflow to ensure SVG filters are applied
					const currentFilter = (glassElement as HTMLElement).style.filter;
					(glassElement as HTMLElement).style.filter = "none";
					requestAnimationFrame(() => {
						(glassElement as HTMLElement).style.filter = currentFilter;
						console.log("Filter refreshed:", currentFilter);
					});
				}
			});
		}
	},
	{ immediate: true }
); // immediate: true for initial load

// Component mount olduğunda setup yap
onMounted(() => {
	// Original onMounted logic
	nextTick(() => {
		updateGlassSize();

		// Set up mouse tracking if no external mouse position is provided
		if (!props.globalMousePos && !props.mouseOffset) {
			const container = props.mouseContainer || glassRef.value;
			if (container) {
				container.addEventListener("mousemove", handleMouseMove);
			}
		}

		window.addEventListener("resize", updateGlassSize);

		// Force SVG filter refresh after mount - multiple attempts
		const forceRefresh = () => {
			if (glassRef.value) {
				const glassElement = glassRef.value.querySelector(".glass__warp");
				if (glassElement) {
					const currentFilter = (glassElement as HTMLElement).style.filter;
					(glassElement as HTMLElement).style.filter = "none";
					requestAnimationFrame(() => {
						(glassElement as HTMLElement).style.filter = currentFilter;
						filterKey.value++; // Force reactivity
						console.log("Mount filter refresh:", currentFilter);
					});
				}
			}
		};

		// Multiple refresh attempts
		setTimeout(forceRefresh, 50);
		setTimeout(forceRefresh, 100);
		setTimeout(forceRefresh, 200);
		setTimeout(forceRefresh, 500);
		setTimeout(forceRefresh, 1000);
	});
});

// Component unmount olduğunda temizle
onUnmounted(() => {
	// Original onUnmounted logic
	if (!props.globalMousePos && !props.mouseOffset) {
		const container = props.mouseContainer || glassRef.value;
		if (container) {
			container.removeEventListener("mousemove", handleMouseMove);
		}
	}

	window.removeEventListener("resize", updateGlassSize);
});

// Watch for mouseContainer changes
watch(
	() => props.mouseContainer,
	(newContainer, oldContainer) => {
		if (!props.globalMousePos && !props.mouseOffset) {
			if (oldContainer) {
				oldContainer.removeEventListener("mousemove", handleMouseMove);
			}
			if (newContainer) {
				newContainer.addEventListener("mousemove", handleMouseMove);
			}
		}
	}
);
</script>

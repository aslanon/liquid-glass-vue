import LiquidGlass from "./LiquidGlass.vue";
import { useLiquidGlass } from "./useLiquidGlass";

// Export the component as default and named export
export { LiquidGlass, useLiquidGlass };
export default LiquidGlass;

// Export types
export type {
	LiquidGlassProps,
	MousePosition,
	GlassSize,
	DisplacementMode,
} from "./types";

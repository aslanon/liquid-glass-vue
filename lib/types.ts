export interface MousePosition {
	x: number;
	y: number;
}

export interface GlassSize {
	width: number;
	height: number;
}

export type DisplacementMode = "standard" | "polar";
export type PositioningMode = "fixed" | "relative";

export interface LiquidGlassProps {
	displacementScale?: number;
	blurAmount?: number;
	saturation?: number;
	aberrationIntensity?: number;
	elasticity?: number;
	cornerRadius?: number;
	overLight?: boolean;
	mode?: DisplacementMode;
	positioning?: PositioningMode;
	globalMousePos?: MousePosition;
	mouseOffset?: MousePosition;
	mouseContainer?: HTMLElement;
	className?: string;
	padding?: string;
	style?: Record<string, any>;
	onClick?: () => void;
}

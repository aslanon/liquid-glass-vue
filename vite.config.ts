import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
			include: ["lib/**/*"],
			exclude: ["**/*.test.*", "**/*.spec.*"],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "LiquidGlassVue",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
		cssCodeSplit: false,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "lib"),
		},
	},
});

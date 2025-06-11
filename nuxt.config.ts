// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
	css: ["~/assets/css/main.css"],

	// GitHub Pages configuration
	app: {
		baseURL: process.env.NODE_ENV === "production" ? "/liquid-glass-vue/" : "/",
	},

	// Static site generation
	nitro: {
		prerender: {
			routes: ["/"],
		},
	},

	// Ensure static generation
	ssr: false,
});

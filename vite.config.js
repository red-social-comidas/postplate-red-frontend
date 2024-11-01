import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cwd } from "node:process";

// https://antfu.me/posts/isomorphic-dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, cwd(), "VITE_");

	return {
		server: {
			port: +env.VITE_DEV_PORT,
			open: true,
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"),
			},
		},
		plugins: [react()],
	};
});

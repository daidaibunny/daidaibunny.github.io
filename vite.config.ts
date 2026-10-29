import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { pageNames, renderPage } from "./src/render.ts";

export default defineConfig({
	plugins: [
		{
			name: "prerender-personal-pages",
			transformIndexHtml: {
				order: "pre",
				handler: (html, context) => {
					const page = pageNames.find((name) => context.filename.endsWith(`/${name}/index.html`));
					return html.replace("<!--page-content-->", renderPage(page ?? "home"));
				},
			},
		},
	],
	build: {
		emptyOutDir: false,
		rolldownOptions: {
			input: Object.fromEntries(
				pageNames.map((page) => [
					page,
					fileURLToPath(
						new URL(page === "home" ? "./index.html" : `./${page}/index.html`, import.meta.url),
					),
				]),
			),
		},
	},
});

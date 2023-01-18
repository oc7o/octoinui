import { sveltekit } from "@sveltejs/kit/vite";
// import path from "path";
import watchAndRun from "@kitql/vite-plugin-watch-and-run";
import path from "path-browserify";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    watchAndRun([
      {
        name: "Houdini",
        watch: path.resolve("src/**/*.(gql|graphql|svelte)"),
        run: "npm run generate",
        delay: 100,
        watchKind: ["ready", "add", "change", "unlink"],
      },
      {
        name: "Houdini",
        watch: path.resolve("houdini.config.js"),
        run: "npm run generate",
        delay: 100,
      },
    ]),
  ],
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  server: {
    fs: {
      allow: ["."],
    },
  },
};

export default config;

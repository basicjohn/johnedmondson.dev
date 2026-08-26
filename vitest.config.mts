import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const stylesDir = path.join(import.meta.dirname, "src", "styles");

export default defineConfig({
  plugins: [react()],
  // Resolves the "@/*" alias from tsconfig.json, so tests import modules by
  // the same specifier the app does.
  resolve: { tsconfigPaths: true },
  css: {
    preprocessorOptions: {
      scss: {
        // Mirrors sassOptions.includePaths in next.config.ts. Component
        // stylesheets open with `@use "tokens"`, which only resolves when
        // src/styles is on the load path.
        loadPaths: [stylesDir],
        includePaths: [stylesDir],
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    // Deliberately off. With real CSS applied, jsdom never evaluates the
    // desktop media query, so mobile-first rules like `.navWrap {
    // display: none }` leave the nav hidden from the accessibility tree and
    // every getByRole against it fails. These tests assert on semantics, not
    // styling, so identity-mapped class names are the honest environment.
    css: false,
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  clearScreen: true,
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./jest-setup.ts",
    silent: true,
    update: true,
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

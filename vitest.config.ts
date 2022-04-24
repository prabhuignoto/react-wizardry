import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react],
  clearScreen: true,
  test: {
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportsDirectory: "./coverage"
    },
    setupFiles: "./jest-setup.ts",
    environment: "jsdom",
    update: true,
    watch: true,
    threads: true,
    silent: true,
    globals: true
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  clearScreen: true,
  plugins: [react],
  test: {
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportsDirectory: "./coverage"
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "./jest-setup.ts",
    silent: true,
    threads: true,
    update: true,
    watch: true,
  },
});

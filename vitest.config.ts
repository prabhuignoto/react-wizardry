import { defineConfig } from "vitest/config";

export default defineConfig({
  clearScreen: true,
  test: {
    coverage: {
      enabled: true,
      include: ["./src/components/**.tsx"],
      reporter: ["text", "json", "html"],
    },
    setupFiles: ["jest-setup.js"],
    environment: "jsdom",
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Enable CSS modules for .module.scss and .module.css files
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // Add global imports for Sass variables and mixins
        additionalData: `
          @use "src/components/styles/_variables.scss" as *;
          @use "src/components/styles/_mixins.scss" as *;
        `,
        includePaths: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'src/components/styles'),
        ],
        silenceDeprecations: ['legacy-js-api'], // Silence Sass deprecation warnings
      },
    },
    // PostCSS config will be automatically loaded from postcss.config.js
    postcss: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/components/styles'),
    },
  },
})

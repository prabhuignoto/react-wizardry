// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import * as importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';

export default tseslint.config(
  // Base ESLint recommended configuration
  eslint.configs.recommended,
  
  // TypeScript ESLint recommended configuration
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.github/**',
      '.vscode/**',
      '.husky/**',
      'public/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.d.ts',
      'vite-env.d.ts',
      '__tests__/**'
    ]
  },
  
  // Configure for React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      security: securityPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      // Disable problematic rules that cause circular dependencies
      'import/order': 'off',
      'import/no-duplicates': 'off',
      
      // React rules
      'react/jsx-sort-props': 'off', // Disable for now to avoid circular fixes
      'react/jsx-runtime': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // React hooks rules - relaxed for now
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility rules
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      
      // Sort keys rules - relaxed to avoid circular issues
      'sort-keys': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
      
      // Security rules - turned to warnings to avoid breaking changes
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      
      // Disable some ESLint rules that might conflict
      'no-useless-escape': 'warn',
    },
  },
  
  // Special configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Disable ESLint rules that TypeScript ESLint handles better
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_', 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off', // Disable to avoid breaking changes
      '@typescript-eslint/consistent-indexed-object-style': 'off', // Disable to avoid breaking changes
      '@typescript-eslint/no-wrapper-object-types': 'off', // Disable to avoid breaking changes
    },
  },
  
  // Test files
  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    rules: {
      // Relaxed rules for tests
      '@typescript-eslint/no-explicit-any': 'off',
      'security/detect-object-injection': 'off',
      'sort-keys': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  }
);

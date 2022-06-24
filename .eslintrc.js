module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "sort-keys-fix"],
  rules: {
    "react/jsx-sort-props": 1,
    "sort-keys-fix/sort-keys-fix": "warn",
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: true,
        natural: true,
      },
    ],
  },
};

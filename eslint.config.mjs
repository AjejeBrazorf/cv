import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:url";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // 1. Inherit Next.js standard configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Your custom overrides
  {
    rules: {
      "no-restricted-exports": "off",
      "quotes": ["error", "single"],
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          "multiline": { "delimiter": "none", "requireLast": true },
          "singleline": { "delimiter": "semi", "requireLast": false },
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          "pathGroupsExcludedImportTypes": ["builtin"],
          "groups": ["external", "internal", "index", "parent", "sibling", "builtin", "object"],
        },
      ],
      "no-shadow": "off",
      "no-multiple-empty-lines": ["error", { "max": 2 }],
      "no-multi-spaces": "error",
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "react/require-default-props": "off",
      "no-underscore-dangle": "off",
      "import/extensions": [
        "error",
        { "style": "always", "json": "always", "svg": "always" },
      ],
      "react/jsx-filename-extension": [
        "error",
        { "extensions": [".js", ".ts", ".tsx"] },
      ],
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "arrow-function",
          "unnamedComponents": "function-expression",
        },
      ],
    },
  },
];

export default eslintConfig;
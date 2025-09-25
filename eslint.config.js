import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { defineFlatConfig } from "eslint-define-config";
import tseslint from "typescript-eslint";

export default defineFlatConfig([
  // Base ESLint recommended rules
  { 
    ignores: ["dist/**", "node_modules/**", "amplify/**"],
  },
  
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      }
    },
    plugins: {
      js
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  
  // TypeScript files
  ...tseslint.configs.recommendedTypeAware,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
  
  // React rules
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "18.3.1"
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off", // Not needed in React 18
      "react/prop-types": "off", // Not needed with TypeScript
      "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }],
      "react/display-name": "off",
      "react/jsx-key": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-unescaped-entities": "warn",
    }
  },
  
  // React Hooks rules
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error", // Enforces Rules of Hooks
      "react-hooks/exhaustive-deps": "warn"   // Warns about missing dependencies in useEffect
    }
  }
]);

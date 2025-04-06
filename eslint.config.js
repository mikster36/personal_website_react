import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        "max-len": ["error", 140],
        "indent": ["error", 4],
        "react/require-default-props": 'off',
        "react/tsx-props-no-spreading": 'off',
        "react/tsx-one-expression-per-line": 'off',
        "no-use-before-define": 'off',
        "@typescript-eslint/no-use-before-define": 'off',
        "no-shadow": 'off',
        "@typescript-eslint/no-shadow": ["error"],
    },
  },
)

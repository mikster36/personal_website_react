import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**', 'amplify/**', 'public/**'],
    },

    js.configs.recommended,

    // Type-aware rules (uses TypeScript program)
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // App/source files (browser)
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2023,
            },
            parserOptions: {
                // Type-aware linting without hard-coding tsconfig paths
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            // react-hooks recommended rules
            ...reactHooks.configs.recommended.rules,

            // React 17+ JSX transform
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            // Usually redundant with TS
            'react/prop-types': 'off',

            // Vite Fast Refresh: avoid exporting non-components from component modules
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },

    // Tooling/config files (node)
    {
        files: ['**/*.{js,cjs,mjs}', '**/*.{ts,cts,mts}'],
        ignores: ['src/**'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2023,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // Must be last: disables ESLint rules that conflict with Prettier
    prettier,
);

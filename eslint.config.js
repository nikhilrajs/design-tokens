// import js from '@eslint/js'
// import globals from 'globals'
// import react from 'eslint-plugin-react'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import prettier from 'eslint-plugin-prettier'
// import prettierConfig from 'eslint-config-prettier'

// export default [
//   // Global ignores
//   {
//     ignores: ['dist', 'node_modules'],
//   },

//   // Base JS rules
//   js.configs.recommended,

//   // TypeScript rules
//   ...tseslint.configs.recommended,

//   // Disable ESLint formatting rules (Prettier takes over)
//   prettierConfig,

//   {
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       globals: {
//         ...globals.browser,
//       },
//     },
//     plugins: {
//       react,
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       prettier,
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//     rules: {
//       // React 17+ / Vite
//       'react/react-in-jsx-scope': 'off',

//       // Hooks
//       ...reactHooks.configs.recommended.rules,

//       // Vite Fast Refresh safety
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],

//       // Prettier enforcement
//       'prettier/prettier': 'error',

//       // Clean unused vars (team-friendly)
//       '@typescript-eslint/no-unused-vars': [
//         'warn',
//         {
//           argsIgnorePattern: '^_',
//           varsIgnorePattern: '^_',
//         },
//       ],
//     },
//   },
// ]

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

export default [
	/* -----------------------------
			Global ignores
	------------------------------*/
	{
		ignores: ['dist', 'node_modules'],
	},

	/* -----------------------------
			Base JS rules
	------------------------------*/
	js.configs.recommended,

	/* -----------------------------
			TypeScript rules (parser included)
	------------------------------*/
	...tseslint.configs.recommended,
	react.configs.recommended,

	/* -----------------------------
			Disable ESLint formatting (Prettier owns formatting)
	------------------------------*/
	prettierConfig,

	/* -----------------------------
			React + TS files
	------------------------------*/
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier,
			'unused-imports': unusedImports,
			import: importPlugin,
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			/* -----------------------------
					Zero-warning / Error-free push
			------------------------------*/
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'no-warning-comments': [
				'error',
				{ terms: ['todo', 'fixme'], location: 'start' },
			],

			'func-style': ['error', 'expression'],
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],

			/* -----------------------------
				 Clean code & hygiene
			------------------------------*/
			'unused-imports/no-unused-imports': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			/* -----------------------------
					TypeScript discipline
			------------------------------*/
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{ 'ts-ignore': 'allow-with-description' },
			],
			'@typescript-eslint/explicit-function-return-type': 'off',

			/* -----------------------------
					React rules (React 18)
			------------------------------*/
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-key': 'error',
			'react/jsx-no-useless-fragment': 'error',

			/* -----------------------------
					Hooks safety (React 18 concurrency)
			------------------------------*/
			...reactHooks.configs.recommended.rules,

			/* -----------------------------
					Vite Fast Refresh safety
			------------------------------*/
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			/* -----------------------------
					Imports & structure
			------------------------------*/
			'import/no-cycle': 'error',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
				},
			],

			/* -----------------------------
					Performance signals
			------------------------------*/
			'react/jsx-no-bind': [
				'warn',
				{
					allowArrowFunctions: true,
					ignoreRefs: true,
				},
			],

			/* -----------------------------
					Prettier enforcement
			------------------------------*/
			'prettier/prettier': 'error',
		},
	},
];

const nextPlugin = require('eslint-plugin-next');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist/', '.cache/', 'public/', 'node_modules/', '.next/'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      tailwindcss: tailwindcssPlugin,
      '@typescript-eslint': tsPlugin,
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules, // ✅ add this line
      '@next/next/no-html-link-for-pages': 'off',
      'react/jsx-key': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },
      next: {
        rootDir: ['./'],
      },
      react: {
        version: 'detect',
      },
    },
  },
];

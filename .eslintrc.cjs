module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'eol-last': ['error', 'always'],
    'no-multi-spaces': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-unused-vars': 'off',
    quotes: ['off', 'single'],
    semi: ['error', 'always'],
  },
};

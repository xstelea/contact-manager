module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['prettier', 'react', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-case-declarations': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/indent': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-cycle': 'off',
    'react/jsx-boolean-value': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/jsx-props-no-spreading': 'off',
  },
};

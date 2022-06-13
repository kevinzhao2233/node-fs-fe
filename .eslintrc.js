module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  rules: {
    // TS 项目中关闭此配置，但是打开 @typescript-eslint/indent
    indent: 'off',
    // TS 项目中关闭此配置，但是打开 @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',
    'no-console': 'off',
    'max-len': ['error', 140],

    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx', 'ts'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': [0],

    /**
     * import 插件相关的
     */
    'import/extensions': [1, 'never'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off',

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};

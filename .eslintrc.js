module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  parser: 'babel-eslint',
  plugins: [
    'detox',
    'jest'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-absolute-path': 0,
    'import/no-named-as-default': 0,
    'react/prop-types': 0,
    'implicit-arrow-linebreak': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react-hooks/exhaustive-deps': 0
  },
  globals: {
    '__DEV__': true,
    'jest/globals': true,
    'detox/detox': true,
    'fetch': true,
    'XMLHttpRequest': true,
    'jest': true,
    'describe': true,
    'expect': true,
    'test': true
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};

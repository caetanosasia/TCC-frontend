module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'consistent-return': 0,
    'no-console': 0,
    'react/no-array-index-key': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-bind': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'max-len': [2, { code: 120, tabWidth: 2, ignoreUrls: true }],
  },
};

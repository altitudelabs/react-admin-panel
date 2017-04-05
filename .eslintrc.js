module.exports = {
  'extends': 'airbnb',
  'installedESLint': true,
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      "experimentalObjectRestSpread": true
    }
  },
  'globals': {
    '_': true,
    '__ENV__': true,
    'customFetch': true,
    'window': true,
    'document': true,
  },
  'rules': {
    'strict': 0,
    'one-var': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': ['error', { 'props': false }],
    'arrow-body-style': 0,
    'consistent-return': 0,
    'no-use-before-define': ['error', { 'functions': false }],
    'new-cap': 0,
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-return-assign': 0,
    'key-spacing': ['error', { 'mode': 'minimum' }],
    'max-len': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    'space-before-function-paren': ['error', 'never'],
    'func-names': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'newline-per-chained-call': 0,
    'no-useless-escape': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    // 'react/jsx-closing-bracket-location': [1, 'props-aligned']
  },
  'plugins': [
    'react'
  ],
  'env': {
    'node': true
  }
};

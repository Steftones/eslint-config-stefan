module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    'node_modules/',
    '**/node_modules/',
    '/**/node_modules/*',
    'out/',
    'dist/',
    'build/',
    'server.js', // probably shouldn't ignore this...
    '*jest*',
    'setupTests.js',
  ],
  extends: [
    // ----- ts options -----
    // 'airbnb-typescrit',
    // 'plugin:@typescript-eslint/recommended'
    // ----------------------
    'eslint-config-airbnb',
    'plugin:react/recommended',
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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: 'true',
  },
  root: true,
  // ----- ts options -----
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: './tsconfig.eslint.json',
  // },
  // ----------------------
  plugins: ['react', 'react-hooks'], // ----- ts options ----- add '@typescript-eslint'
  rules: {

    /* -------- typescript rules --------
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        'assertionStyle': 'as',
        'objectLiteralTypeAssertions': 'never'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        'disallowTypeAnnotations': true
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        'fixStyle': 'separate-type-imports'
      }
    ],
    '@typescript-eslint/comma-dangle': 'off', // interferes with comma-dangle rules below
    */

    // 'prettier/prettier': 'error',
    'linebreak-style': 'off', // causes problems to denote the end of a line LF/CRLF
    'react/react-in-jsx-scope': 'off', // turned off as per React 18
    'react/prop-types': 'off', // assuming you don't want to use propTypes
    'react/function-component-definition': 'off', // allows for components to be arrow functions
    'max-params': ['error', 3], // functions should have a maximum of 3 arguments
    'prefer-object-spread': 'error', // use the spread operator instead of Object.assign
    'react-hooks/rules-of-hooks': 'error', // enforces standard hook rules
    'no-console': 'warn', // error if there is a console.log/info etc
    'no-extra-parens': 'error', // enforces unnecessary parentheses e.g. const someMaths = (1 * 2);
    'no-nested-ternary': 'error', // nested ternarys are hard to read
    complexity: 'error', // enforcing cyclomatic complexity of 11, as per airbnb rules
    'comma-dangle': [ // enforcing trailing commas
      'error',
      {
        objects: 'always-multiline',
        exports: 'always-multiline',
        imports: 'always-multiline',
        arrays: 'always-multiline',
        functions: 'never',
      },
    ],
    // if we use propTypes or TypeScript this would be useful
    'react/boolean-prop-naming': [
      'error',
      {
        propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
        rule: '^((can|is|show|has|should|hide)[A-Z]([A-Za-z0-9]?)+|(show|hide))',
      },
    ],
  },
};

const commonRules = {
  'react/jsx-filename-extension': [
    /* only allows .jsx and .tsx files to contain
    jsx - forces you to rename .js component files to .jsx */
    'error',
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'react/boolean-prop-naming': [
    /* TODO: only works for components with props defined by
    types, not for interfaces, but works for .jsx files */
    'error',
    {
      propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
      rule: '^((is|has|can|show|hide|should)[A-Z]([A-Za-z0-9]?)+|(show|hide))',
    },
  ],
  'react/function-component-definition': 'off', // allows for components to be arrow functions
  'react/jsx-uses-react': 'off', // enable if you're not using React 18
  'react/react-in-jsx-scope': 'off', // turned off as per React 18
  'linebreak-style': 'off', // causes problems to denote the end of a line LF/CRLF
  // 'prettier/prettier': 'error', // TODO: configure prettier to work with linting styling rules
  'max-params': ['error', 3], // functions should have a maximum of 3 arguments
  'prefer-object-spread': 'error', // use the spread operator instead of Object.assign
  'react-hooks/rules-of-hooks': 'error', // enforces standard hook rules
  'no-console': 'warn', // warning if there is a console.log/info etc
  // 'no-magic-numbers': 'error', // magic numbers and strings can lead to mistakes
  'no-nested-ternary': 'error', // nested ternaries are hard to read
  complexity: 'error', // enforcing cyclomatic complexity of 11, as per airbnb's rules
  'comma-dangle': [
    // enforcing trailing commas
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    },
  ],
  'react/forbid-dom-props': [
    // forbid inline styles in DOM elements
    'error',
    {
      forbid: ['style'],
    },
  ],
  'object-curly-newline': [
    'error',
    {
      ObjectExpression: { consistent: true, multiline: true },
      ObjectPattern: { consistent: true, multiline: true },
      ExportDeclaration: { multiline: true, minProperties: 3 },
    },
  ],
};

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
    '*jest*',
    'setupTests.js',
  ],
  extends: ['eslint-config-airbnb', 'plugin:react/recommended', 'prettier'],
  plugins: ['react', 'react-hooks'],
  overrides: [
    {
      env: {
        browser: true,
        es2021: true,
      },
      files: ['*.js', '*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          // .babelrc not needed now
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      rules: {
        ...commonRules,
        'react/prop-types': 'error', // requires you to add propTypes in a js or jsx file
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'prettier'],
      plugins: ['@typescript-eslint'],
      rules: {
        ...commonRules,
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: true,
            fixStyle: 'separate-type-imports',
          },
        ],
        '@typescript-eslint/comma-dangle': 'off', // interferes with comma-dangle rules above
      },
    },
  ],
  root: true,
};

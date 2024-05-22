module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-selector-bem-pattern', 'stylelint-scss'],
  ignoreFiles: ['node_modules/**', 'coverage/**', 'dist/**'],
  rules: {
    'selector-class-pattern': null, // camel case preferred for React
    'keyframes-name-pattern': null,
    'plugin/selector-bem-pattern': {
      componentName: '[A-Z]+',
      componentSelectors: {
        initial: '^\\.{componentName}(?:-[a-z]+)?$',
        combined: '^\\.combined-{componentName}-[a-z]+$',
      },
      utilitySelectors: '^\\.util-[a-z]+$',
      preset: 'bem',
    },
    'scss/at-mixin-pattern': null,
  },
};

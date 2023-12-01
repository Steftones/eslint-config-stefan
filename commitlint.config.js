/*
Proposed standardised format for commit messages:

type(scope): subject

e.g.
feat(ticketNumber): adding navbar

https://github.com/conventional-changelog/commitlint/#what-is-commitlint
*/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [
      2,
      'never',
      ['pascal-case', 'camel-case', 'kebab-case'],
    ],
  },
};

/* eslint-disable no-console */
const fse = require('fs-extra');

const info = JSON.parse(fse.readFileSync('../../package.json', 'utf8'));

const output = {
  ...info,
  scripts: {
    ...info.scripts,
    lint: 'eslint --ext .jsx --ext .js .',
    'lint:fix': 'eslint --ext .jsx --ext .js . --fix',
    prepare: 'husky install',
  },
  eslintConfig: {
    ...info.eslintConfig,
    extends: 'eslint-config-stefan',
  },
};

try {
  fse.writeFileSync('../../package.json', JSON.stringify(output, null, 2));
  console.log('success adding scripts to package.json!');
} catch (err) {
  console.error(err);
}

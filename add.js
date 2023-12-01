/* eslint-disable no-console */
const fse = require('fs-extra');

// add husky
try {
  fse.copySync('./.husky', '../../.husky', { overwrite: true });
  console.log('Success adding husky files for commit hooks!');
  fse.copyFile('commitlint.config.js', '../../commitlint.config.js');
  console.log('Success adding commitlint config file!');
} catch (err) {
  console.error(err);
}

// add scripts to package.json
const PACKAGE_PATH = '../../package.json';
const info = JSON.parse(fse.readFileSync(PACKAGE_PATH, 'utf8'));

const output = {
  ...info,
  scripts: {
    ...info.scripts,
    lint: 'eslint .',
    'lint:fix': 'eslint . --fix',
    prepare: 'husky install',
  },
  eslintConfig: {
    ...info.eslintConfig,
    extends: 'eslint-config-stefan',
  },
};

try {
  fse.writeFileSync(PACKAGE_PATH, JSON.stringify(output, null, 2));
  console.log('success adding scripts to package.json!');
} catch (err) {
  console.error(err);
}

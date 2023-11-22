/* eslint-disable no-console */
const fse = require('fs-extra');

try {
  fse.copySync('./.husky', '../../.husky', { overwrite: true });
  console.log('Success adding husky files for commit hooks!');
  fse.copyFile('commitlint.config.js', '../../commitlint.config.js');
  console.log('Success adding commitlint config file!');
} catch (err) {
  console.error(err);
}

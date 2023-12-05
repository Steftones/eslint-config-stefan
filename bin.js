#!/usr/bin/env node
/* eslint-disable no-console */
const fse = require('fs-extra');
const path = require('path');

try {
  fse.copySync(path.join(__dirname, './.husky'), path.join(__dirname, '../../.husky'), { overwrite: true });
  console.log('Success adding husky files for commit hooks!');
  fse.copyFile(path.join(__dirname, './commitlint.config.js'), path.join(__dirname, '../../commitlint.config.js'));
  console.log('Success adding commitlint config file!');
  fse.copyFile(path.join(__dirname, './tsconfig.json'), path.join(__dirname, '../../tsconfig.json'));
  console.log('Success adding typescript config file!');
} catch (error) {
  console.error(error);
}

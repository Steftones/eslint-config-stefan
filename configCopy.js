#!/usr/bin/env node
/* eslint-disable no-console */
const yargs = require('yargs');
const fse = require('fs-extra');

if (yargs.argv.tsconfig) {
  try {
    fse.copyFile('tsconfig.json', '../../tsconfig.json');
    console.log('Success adding typescript config!');
  } catch (err) {
    console.error(err);
  }
}

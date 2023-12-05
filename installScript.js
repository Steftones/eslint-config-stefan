/* eslint-disable max-len */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const PACKAGE_PATH = path.join(__dirname, '../..');
let hasGitPath = false;
let pathToGitFolder = PACKAGE_PATH;
let levelsDeep = 0;

const writeFileCallback = (error, hookType) => {
  if (error) {
    console.error(`failed to add ${hookType} hook`);
  } else {
    console.log(`success adding ${hookType} hook`);
  }
};

// exit if the parent directory isn't a node modules folder
if (path.basename(path.join(__dirname, '../')) !== 'node_modules') {
  process.exit();
}

// get the path to the .git folder
if (fs.existsSync(path.join(PACKAGE_PATH, '.git'))) {
  hasGitPath = true;
}

while (!hasGitPath) {
  levelsDeep += 1;
  pathToGitFolder = path.join(pathToGitFolder, '../');
  if (fs.existsSync(path.join(pathToGitFolder, '.git'))) {
    hasGitPath = true;
  }
}

// get relative path from git folder to PACKAGE_PATH
const gitToPackagePath = path.relative(pathToGitFolder, PACKAGE_PATH).split('\\').join('/');

// package prepare script
const packagePrepareScript = levelsDeep === 0
  ? 'npx husky install && npx eslint-config-stefan'
  : `cd ${`${'../'.repeat(levelsDeep)}`} && npx husky install ${gitToPackagePath}/.husky && cd ./${gitToPackagePath} && npx eslint-config-stefan`;

// add a pre-commit hook
const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
cd ./${gitToPackagePath}
npm run lint
`;
fs.writeFileSync(path.join(__dirname, '.husky/pre-commit'), preCommitHook, (error) => writeFileCallback(error, 'pre-commit'));

// add commit-msg hook
const commitMsgHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
cd ./${gitToPackagePath}
npx commitlint --config ./commitlint.config.js --edit --color --help-url
`;
fs.writeFileSync(path.join(__dirname, '.husky/commit-msg'), commitMsgHook, (error) => writeFileCallback(error, 'commit-msg'));

// add linting scripts to project package, e.g. lint: "npm run lint ."
const projectPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));

const projectPackageJsonOutput = {
  ...projectPackageJson,
  scripts: {
    ...projectPackageJson.scripts,
    prepare: packagePrepareScript,
    lint: 'eslint . --color',
    'lint:fix': 'eslint . --fix',
  },
  eslintConfig: {
    ...projectPackageJson.eslintConfig,
    extends: 'eslint-config-stefan',
  },
};

try {
  fs.writeFileSync(path.join(__dirname, '../../package.json'), JSON.stringify(projectPackageJsonOutput, null, 2));
  console.log('success adding scripts to project package.json');
} catch (error) {
  console.error('failed adding scripts to project package.json');
}

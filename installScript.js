/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const PACKAGE_PATH = path.join(__dirname, '../..');
let hasGitPath = false;
let pathToGitFolder = PACKAGE_PATH;

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
  pathToGitFolder = path.join(pathToGitFolder, '../');
  if (fs.existsSync(path.join(pathToGitFolder, '.git'))) {
    hasGitPath = true;
  }
}

// get relative path from git folder to PACKAGE_PATH
const gitToPackagePath = path.relative(pathToGitFolder, PACKAGE_PATH).split('\\').join('/');

// edit the git config file
execSync(`git config --local core.hooksPath ${gitToPackagePath && `${gitToPackagePath}/`}.husky`);

const hookBase = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
cd ./${gitToPackagePath}
`;

// add a pre-commit hook
const preCommitHook = `${hookBase}npm run prettier:fix && npm run lint`;
fs.writeFileSync(path.join(__dirname, '.husky/pre-commit'), preCommitHook, (error) =>
  writeFileCallback(error, 'pre-commit')
);

// add commit-msg hook
const commitMsgHook = `${hookBase}npx commitlint --config ./commitlint.config.cjs --edit --color --help-url`;
fs.writeFileSync(path.join(__dirname, '.husky/commit-msg'), commitMsgHook, (error) =>
  writeFileCallback(error, 'commit-msg')
);

// add linting scripts to project package, e.g. lint: "npm run lint ."
const projectPackageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
);

const projectPackageJsonOutput = {
  ...projectPackageJson,
  scripts: {
    ...projectPackageJson.scripts,
    lint: 'eslint . --color && npx stylelint **/*.{css,scss}',
    'lint:fix': 'eslint . --fix && npx stylelint **/*.{css,scss} --fix',
    'prettier:fix': 'prettier . --write',
  },
  eslintConfig: {
    ...projectPackageJson.eslintConfig,
    extends: 'eslint-config-stefan',
  },
};

try {
  fs.writeFileSync(
    path.join(__dirname, '../../package.json'),
    JSON.stringify(projectPackageJsonOutput, null, 2)
  );
  console.log('Success adding scripts to project package.json');
} catch (error) {
  console.error(error);
}

try {
  fs.cpSync(path.join(__dirname, './.husky'), path.join(__dirname, '../../.husky'), {
    recursive: true,
  });
  console.log('Success adding husky files for commit hooks!');
  fs.cpSync(
    path.join(__dirname, './commitlint.config.cjs'),
    path.join(__dirname, '../../commitlint.config.cjs')
  );
  console.log('Success adding commitlint config file!');
  fs.cpSync(
    path.join(__dirname, './stylelint.config.cjs'),
    path.join(__dirname, '../../stylelint.config.cjs')
  );
  console.log('Success adding stylelint config file!');
  // fs.cpSync(path.join(__dirname, './tsconfig.json'), path.join(__dirname, '../../tsconfig.json'));
  // console.log('Success adding typescript config file!');
  fs.cpSync(
    path.join(__dirname, './.prettierrc.json'),
    path.join(__dirname, '../../.prettierrc.json')
  );
  console.log('Success adding prettier config file!');
} catch (error) {
  console.error(error);
}

# eslint-config-stefan

Configures your React project:
* React/TypeScript linting rules
* Git commit linting rules
* Git pre-commit hooks

## Install
```
npm i eslint-config-stefan
```
- Installation will add files/folders to your project and scripts to your `package.json`
- If your project is not TypeScript based, delete `tsconfig.json`

## Useage
* Check your code for errors: `npm run lint`
* Fix coding errors: `npm run lint:fix`
* Write commit messages using the Conventional Commit Format: `type(scope?): subject`. More info here: [https://conventionalcommits.org/](https://conventionalcommits.org/)
* If you need to bypass any checks, add `--no-verify` after your commit message

## Todo/Issues
* Prettier support
* Jest support
* If your React app `package.json` is not in the same directory as your `.git` folder you may need to copy your `tsconfig.json`, place it at the top level directory and restart your IDE to get full TypeScript support
* May not work with `tsc -w`
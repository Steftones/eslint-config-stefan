# eslint-config-stefan

Sets up the following for your React project:
* React linting rules
* Git commit linting rules
* Git pre-commit hooks

- Rules are based around modern standards and airbnb's rules
- Works with TypeScript

## Install
```
npm i eslint-config-stefan
npm run prepare
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
* If your React app `package.json` is not in the same directory as your `.git` folder you may need to copy your `tsconfig.json`, place it in the `.git` folder directory and restart your IDE to get full TypeScript support
* May not work with `tsc -w`
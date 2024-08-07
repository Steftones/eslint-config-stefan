# eslint-config-stefan

Configures your React project:

- React/TypeScript linting
- CSS and SCSS linting
- Jest linting
- Git commit linting
- Git pre-commit hooks
- Prettier config

## Install

```
npm install eslint-config-stefan --save-dev
```

- Installation will add files/folders to your project and scripts to your `package.json`
- If your project is not TypeScript based, delete `tsconfig.json`

## Useage

- Check your code for errors: `npm run lint`
- Fix coding errors: `npm run lint:fix`
- Fix styling issues: `npm run prettier:fix`
- Write commit messages using the Conventional Commit Format: `type(scope?): subject`. More info here: [https://conventionalcommits.org/](https://conventionalcommits.org/)
- If you need to bypass any checks, add `--no-verify` after your commit message

## Todo/Issues

- If your React app `package.json` is not in the same directory as your `.git` folder you may need to copy your `tsconfig.json`, place it at the top level directory and restart your IDE to get full TypeScript support
- May not work with `tsc -w`

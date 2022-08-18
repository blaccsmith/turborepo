# Welcome to BLACC's Website

This repo is the monorepo for the [BLACC website](https://blacc.xyz).

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/sites:

### Sites and Packages

-   `core`: a [Next.js](https://nextjs.org) app
-   `blog`: another [Next.js](https://nextjs.org) app
-   `ui`: a stub React component library shared by both `core` and `blog` applications
-   `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

## Setup

This repository primarilly uses [Turborepo](https://turborepo.org) as its build system and [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines ✨ To learn more about Turborepo, visit their [docs](https://turborepo.org/docs).

### Develop
Before you start contributing, ensure you have installed the necessary dependencies by runninf the following command:

```
yarn install
```

To develop all sites and packages, run the following command:

```
yarn run dev
```

![start_script](https://user-images.githubusercontent.com/88869469/185513433-e6ada930-4d9c-4c43-bd90-d609d4bcd3d0.png)
> You should see the following in your terminal with no errors.

### Build

To build all sites and packages, run the following command:

```
yarn run build
```

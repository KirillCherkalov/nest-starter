<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

Effective Soft Node.js TypeScript starter app based on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Files that you need to change to use jwt auth instead of sessions

- main.ts
- local-auth.guard.ts
- jwt.ts
- auth.controller.ts
- auth.module.ts
- auth.service.ts
- config.service.ts
- validator.ts
- config.ts
- users.controller.ts

Tips for replacement you can search by keyword phrase - `jwt auth`

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

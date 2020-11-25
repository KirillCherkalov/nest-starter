<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

Effective Soft Node.js TypeScript starter app based on [Nest](https://github.com/nestjs/nest) framework.

## Building the image

```bash
$  docker build -t nest-starter .
```
## Running the app

```bash
# watch & debug mode
$ docker-compose up -d
```

## Hint for adding new env variables

To add/edit env variables u should update code into these files:

- .env
- .env.example
- config.service.ts
- validator.ts
- config.ts

## Monitoring services

If you need additional monitoring of the application, you can consider such libraries as:

- [Appmetrics](https://bitbucket.effective-soft.com/projects/ES617/repos/nest-starter/pull-requests/34/overview)
- [Prometheus](https://bitbucket.effective-soft.com/projects/ES617/repos/nest-starter/pull-requests/33/overview)
- [@nestjs/terminus](https://bitbucket.effective-soft.com/projects/ES617/repos/nest-starter/pull-requests/32/overview)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```
$ yarn
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run migration

npm run typeorm:generate -n Init
npm run typeorm:run

password default: $2b$12$3.7JhJKdBP8Lnoore/aMuOjBt8oiIPwyc1X5JLL6AB9oP2Mh1ato2

# Clean Architecture

Concretely, there are 3 main packages: domain, usecases and infrastructure. These packages have to respect these rules:

-   domain contains the business code and its logic and has no outward dependency: nor on frameworks (NestJS in our case), nor on use_cases or infrastructure packages.
-   usecases is like a conductor. It will depend only on domain package to execute business logic. use_cases should not have any dependencies on infrastructure (including framework or npm module).
-   infrastructure contains all the technical details, configuration, implementations (database, web services, npm module, etc.), and must not contain any business logic. infrastructure has dependencies on domain, use_cases and frameworks.

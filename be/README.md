## Installation

```
$ yarn
```

## install NODEV_ENV

<!-- for windows -->

npm install -g win-node-env

## Running the app

```bash
# development
$ npm run start

# debug mode
$ npm run start:debug

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run migration

npm run typeorm:generate -n Init
npm run typeorm:run

password default: $2b$12$3.7JhJKdBP8Lnoore/aMuOjBt8oiIPwyc1X5JLL6AB9oP2Mh1ato2

# Clean Architecture

Concretely, there are 3 main packages: domain, usecases and infrastructure. These packages have to respect these rules:

-   Use case flow
    Main part of a use case. It do step to step to accomplish a business requirement.
    Lay in Application layer (the middle one). So it can use entity or business rule directly but needs to inject access to use. This one don't care about things on outer layers.

-   Use case engine
    What is it?
    Same level as use case so use case can import it directly.

-   What is its responsibility?
    Do things strong related with its use case.
    Do query / access with cross border concern.
    Do query / access with extra processing.

-   What can it do also?
    Can use repo directly without any access.
    Can use access and presenter directly without injecting.

These feature also violations.

Application layer items are prohibited to do that.

-   Use case presenter
    Output of use case or engine. Return plaint old object

-   Use case validator
    Entry point of every use cases. Return plaint old object. This one ensure input of use case is expected. No need to code in defend mode.

-   Access
    Functions that access DB or external API. Only ACCESS means pure retrieving or changing data of those sources.

-   Entity
    Objects that flow in use case to accomplish a requirement
    This one in most inner layer, it's care free, every thing else have to serve them.

-   Business rule
    Lay on most inner layer. Just constants or pure functions

-   Design decision
    The tradeoff of letting engine do prohibited things will take some benefits:

-   Complexity only belongs to engines.
    Engines is the only places we consider when breaking out monolith system to service based one.
    It's convenient to work with.
    It's have no negative impact about changing requirements. It help us to deal with changing requirements with ease because with have more flexibility.
    Some drawback:

It potential become big ball of mugs because it can do almost everything. So use / design it with care.

# REST API

## Getting Started

### Install Dependencies

```bash
yarn
```

### Enable Husky

```bash
yarn husky install
```

### Launch Dev

```bash
yarn dev
```

### Launch Test

- all tests

```bash
yarn test
```

all tests with coverage

```bash
yarn test:coverage
```

all tests in watch mode

```bash
yarn test:watch
```

### Launch Prod

```bash
yarn check:all
yarn build:start
```

production with docker

```bash
yarn check:all
docker compose up
```

## Tech stack

- Node.js
- Express
- mongoDB / mongoose (database)
- redis (caching)
- typescript (type-safety)
- Docker (deployment)
- Github actions (CI)
- Prettier (code formatter)
- Eslint (code lintter)
- Husky (check error lintting, formatting, type-safety on pre-commit/ pre-push)
- Jest - Testing-librairy (unit / integration testing)

## Content

- basic auth system
- utils functions
  - jwt
    - authentication
    - authorization
  - crypto
    - encrypt
    - decrypt sensitive data
  - cors (white list of IP addresses)
  - cache (layer caching)
- middlewares
  - auth (authentication / authorization)
  - caching
  - check api version
    - query string
    - header
    - uri
  - compress (compress HTTP response)
  - data deserialization
    - plain data
    - encrypted data
  - crypto (decrypt data)
  - error
    - global error handling
    - catch all routes
  - security
    - rate limiter
    - http headers
    - mongodb-sanitizer
    - secure headers (helmet)
    - limit body size 10Kb
    - OWASP

## CI/CD

### CI

github actions workflow triggers on push / pull on master branch only.

1. checks:

- type-safety
- format
- linting

2. create a build app (from .ts -> .js)
3. create docker app build (docker image)

### CD

push integrated code to production (deployment)

## Graceful

Graceful shutdown is function that is trigger while a a signal is receive by the server to shut it dow.
this function make sure that all processes, and sub-processes that are running, will stop, after finish their current running tasks.

close:

- cache
- server
- mongodb

## Monitoring

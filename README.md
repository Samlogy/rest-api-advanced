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
yarn check-all
yarn build:start
```

production with docker

```bash
yarn check-all
docker compose up
```

## Content

- basic auth system
- utils functions
  - jwt
  - crypto (encrypt / decrypt)
  - cors
  - cache
- middlewares
  - auth (authentication / authorization)
  - caching
  - check api version
  - crypto (decrypt data)
  - error (global error handling / catch all routes)
  - security (rate limiter / http headers)

## Tech stack

- Node.js
- Express
- mongoDB / mongoose (database)
- redis (caching)
- typescript (type-safety)
- Docker (deployment)
- Prettier (code formatter)
- Eslint (code lintter)
- Husky (check error lintting, formatting, type-safety on pre-commit/ pre-push)
- Jest - Testing-librairy (unit / integration testing)

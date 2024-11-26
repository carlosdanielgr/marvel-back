<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Marvel project with NestJS

This is a project developed with [NestJS](https://nestjs.com/) and Docker containers for easy deployment and configuration of the environment.

## Requirements

Make sure you have the following requirements installed on your machine before proceeding:

1. **Node.js y npm**

   - [Download and install Node.js](https://nodejs.org/) (includes npm).
   - Recommended version: **Node.js 16+**.

2. **NestJS CLI**

   - Globally install version 10 of NestJS CLI:
     ```bash
     npm install -g @nestjs/cli@10
     ```
   - Verify the installation:
     ```bash
     nest --version
     ```

3. **Docker**
   - Install Docker from its [official site](https://www.docker.com/get-started).
   - Verify that Docker is working properly:
     ```bash
     docker --version
     ```

## Configure environment

Duplicate the **.env.development** file and rename it to **.env**

## Installation

- With npm

```bash
$ npm install
```

- With yarn

```bash
$ yarn install
```

## Running the app

```bash
# Build up database
$ docker-compose up -d

# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

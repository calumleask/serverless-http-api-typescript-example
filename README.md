# serverless-http-api-typescript-example

A Serverless HTTP API example written in typescript

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.x, serverless doesn't work with v16.x yet)
- npm (installed with Node.js)
- Java Runtime Engine (JRE) version 6.x or newer (required by serverless-dynamodb-local)

## Setup

- `npm install`

## Running Locally

- Run `npm start`

## Testing Locally

The following command runs jest preceded by lint

- `npm test`

To run jest without lint

- `npm run jest`

To run lint

- `npm run lint`

### HTTP API

#### hello

- `curl -X GET http://localhost:3000/dev/hello`

Query Params `name=<string>`

- `curl -X GET http://localhost:3000/dev/hello?name=<string>`

Returns `{ message: string; }`

### Deployment

- `cd layer/nodejs`
- `npm i`
- `cd ../..`
- export NODE_OPTIONS="--max-old-space-size=8192"
- `npm run deploy`

# Ufonia

Send voice calls with a message to a given telephone number via Twilio.

## Tech Stack

**client-app:** React, react-hook-form, Apollo Client TailwindCSS, Jest, Docker

**apollo:** Apollo Server, Jest, Docker

## Demo

https://ufonia.witchert.co.uk

## Prerequisites

- [PNPM](https://pnpm.io/)
- [create-react-app](https://create-react-app.dev/)

## Installation

Using pnpm from the root directory:

```bash
  pnpm i
```

You should also set up the following env variables for the apollo app:

```env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_TEL_NO=...
```

and optionally for the client-app:

```env
REACT_APP_GRAPH_API=... (default: http://localhost:4000)
```

## Running Tests

To run tests, run the following command

```bash
  pnpm test
```

or for each app:

```bash
  pnpm --filter apollo test
  pnpm --filter client-app test
```

## Run Locally

Start the server

```bash
  pnpm start
```

or for each app:

```bash
  pnpm --filter apollo start
  pnpm --filter client-app start
```

## Run via Docker

Example docker-compose file:

```yml
version: "3"

services:
  apollo:
    image: ufonia-apollo
    environment:
      - TWILIO_ACCOUNT_SID=...
      - TWILIO_AUTH_TOKEN=...
      - TWILIO_TEL_NO=...
    ports:
      - 4000:4000
    restart: unless-stopped
    build:
      context: ./apps/apollo
      dockerfile: ./Dockerfile
  client-app:
    image: ufonia-client-app
    ports:
      - 3000:3000
    restart: unless-stopped
    build:
      context: ./apps/client-app
      dockerfile: ./Dockerfile
      args:
        - REACT_APP_GRAPH_API=...
```

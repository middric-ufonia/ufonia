FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS app
WORKDIR /usr/src/app
COPY package.json .
RUN pnpm install

COPY . .
EXPOSE 4000
CMD pnpm start
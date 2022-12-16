#Build Stage
FROM node:16.17.0-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install

RUN npx tsc


#RUntime Stage
FROM node:16.17.0-alpine as server

WORKDIR /app

COPY . .

COPY --from=dependencies /app/lib ./lib

RUN yarn install --production

EXPOSE 8040

CMD yarn serve
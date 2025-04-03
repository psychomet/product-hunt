# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm i
COPY . .
RUN npx nx build shop --skip-nx-cache

# production stage
FROM node:20-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist/apps/shop ./dist/apps/shop


CMD ["node", "dist/apps/shop/server/server.mjs"]

EXPOSE 4000
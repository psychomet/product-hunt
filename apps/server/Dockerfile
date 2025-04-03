# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm i
COPY . .
RUN npx nx build server --skip-nx-cache

# production stage
FROM node:20-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist/apps/server ./dist/apps/server
# Install runtime dependencies - npm used here due to package nesting issues
# when using yarn
RUN cd dist/apps/server && npm i
COPY static ./static
EXPOSE 3000
EXPOSE 3002
CMD ["node", "dist/apps/server/main.js"] 
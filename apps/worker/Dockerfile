# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm i
COPY . .
RUN npx nx build worker --skip-nx-cache

# production stage
FROM node:20-alpine as production-stage
# Add tini for proper signal handling
RUN apk add --no-cache tini
WORKDIR /app
COPY --from=build-stage /app/dist/apps/worker ./dist/apps/worker
# Install runtime dependencies - npm used here due to package nesting issues
# when using yarn
RUN cd dist/apps/worker && npm i
COPY static ./static
EXPOSE 3123
# Use tini as entrypoint to properly handle signals
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/apps/worker/main.js"] 
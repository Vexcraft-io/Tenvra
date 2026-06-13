FROM node:24.12.0-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/coordinator/package.json apps/coordinator/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN pnpm install --frozen-lockfile
COPY apps/coordinator apps/coordinator
COPY packages/contracts packages/contracts
COPY packages/typescript-config packages/typescript-config
RUN pnpm --filter @tenvra/coordinator build

FROM node:24.12.0-alpine AS runtime
ENV NODE_ENV=production
USER node
WORKDIR /app/apps/coordinator
COPY --from=build --chown=node:node /app/node_modules /app/node_modules
COPY --from=build --chown=node:node /app/apps/coordinator/node_modules ./node_modules
COPY --from=build --chown=node:node /app/apps/coordinator/package.json ./package.json
COPY --from=build --chown=node:node /app/apps/coordinator/dist ./dist
COPY --from=build --chown=node:node /app/packages/contracts /app/packages/contracts
EXPOSE 4100
CMD ["node", "dist/server.js"]

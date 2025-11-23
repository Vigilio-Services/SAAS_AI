FROM node:22.16.0 AS base
WORKDIR /usr/src/app
RUN npm i -g pnpm
FROM base AS dependencies
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install


FROM base AS development
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
CMD ["pnpm", "run", "serve"]

FROM base AS build
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm run build:serve && \
    pnpm run build:client && \
    rm -rf node_modules && pnpm install --production   --frozen-lockfile


# Production stage
FROM base AS production
WORKDIR /usr/src/app

# Crear usuario no-root con home directory
RUN addgroup -g 1001 nodejs && \
    adduser -u 1001 -G nodejs -S -h /usr/src/app vigilio

# Crear directorios con permisos adecuados
RUN mkdir -p logs && \
    chown -R vigilio:nodejs logs && \
    chmod -R 755 logs

# Copiar archivos directamente con ownership correcto
COPY --chown=vigilio:nodejs --from=build /usr/src/app/package*.json ./
COPY --chown=vigilio:nodejs --from=build /usr/src/app/node_modules ./node_modules/
COPY --chown=vigilio:nodejs --from=build /usr/src/app/dist ./dist/
COPY --chown=vigilio:nodejs --from=build /usr/src/app/public ./public/
COPY --chown=vigilio:nodejs --from=build /usr/src/app/migrations ./migrations/
COPY --chown=vigilio:nodejs --from=build /usr/src/app/.sequelizerc ./
COPY --chown=vigilio:nodejs --from=build /usr/src/app/src/assets/temp ./src/assets/temp/

# Ya no hace falta un chown masivo aquí 
USER vigilio

CMD ["pnpm", "run", "start"]
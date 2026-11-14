# CBS Builder Sandbox image for the DLP Playbook.
#
# Drop this single file into the sandbox prototypes repo as
# apps/cloudport-dlp-playbook/Dockerfile. It pulls the playbook from its own
# GitHub repository at build time, so no application code lives in the
# sandbox repo and every push to the playbook's `main` is picked up on the
# next sandbox build.
#
# Build arg PLAYBOOK_REF selects the branch or tag to deploy (default main).

FROM node:22-alpine AS source
RUN apk add --no-cache git
ARG PLAYBOOK_REF=main
RUN git clone --depth 1 --branch "${PLAYBOOK_REF}" \
    https://github.com/ParaShrout/cloudport-dlp-playbook.git /src

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=source /src/package.json /src/package-lock.json ./
RUN npm ci
COPY --from=source /src ./
ENV NEXT_TELEMETRY_DISABLED=1 STANDALONE=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

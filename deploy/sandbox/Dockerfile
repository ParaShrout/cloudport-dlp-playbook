# CBS Builder Sandbox image for the DLP Playbook.
#
# Lives in the sandbox prototypes repo as apps/cloudport-dlp-playbook/Dockerfile.
# The build context there is the repo root (see build-apps.yml) but nothing is
# copied from it: the playbook is cloned from its own GitHub repository at
# build time, so no application code lives in the sandbox repo and every push
# to the playbook's `main` is picked up on the next sandbox build.
#
# Build arg PLAYBOOK_REF selects the branch or tag to deploy (default main).

FROM node:24-bookworm-slim AS source
RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*
ARG PLAYBOOK_REF=main
RUN git clone --depth 1 --branch "${PLAYBOOK_REF}" \
    https://github.com/ParaShrout/cloudport-dlp-playbook.git /src

FROM node:24-bookworm-slim AS builder
WORKDIR /app
ENV CI=true NEXT_TELEMETRY_DISABLED=1 STANDALONE=1
COPY --from=source /src/package.json /src/package-lock.json ./
RUN npm ci
COPY --from=source /src ./
RUN npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

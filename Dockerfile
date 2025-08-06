
FROM node:18.18.0-buster AS deps
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:18.18.0-buster AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build && npm run export

# Production image, copy all the files and run next
FROM node:18.18.0-buster AS runner
RUN npm install -g serve --force
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000


CMD ["serve","-s","out","-p" ,"3000"]
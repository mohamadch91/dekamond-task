
FROM node:18.18.0-buster AS deps
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install


FROM node:18.18.0-buster AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build 


FROM node:18.18.0-buster AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npx", "next", "start"]
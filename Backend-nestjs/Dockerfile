# ===== 1. Dependencies =====
FROM node:22 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci


# ===== 2. Build =====
FROM node:22 AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build


# ===== 3. Production =====
FROM node:22 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 8080

CMD ["node", "dist/main"]

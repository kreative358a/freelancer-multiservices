# l. 621
# FROM node:21-alpine3.18 as builder
FROM node:22-alpine3.20 AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
# COPY vite.config.js ./
RUN npm ci
COPY . .
# Bundle app source
RUN npm run build

FROM nginx:stable-alpine
# FROM nginx:126_alpine3.20

WORKDIR /app
COPY --from=builder /app/build /app/html
COPY nginx.conf /app
RUN mkdir -p /app/run && apk add --no-cache bash && apk add --no-cache curl

EXPOSE 80

CMD ["nginx", "-c", "/app/nginx.conf"]

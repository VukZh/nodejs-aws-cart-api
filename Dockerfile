#multistages - 545MB

FROM node:15-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:15-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]


FROM node:16 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS production

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://localhost:27017/your-db-name
ENV ROOT_URL=http://localhost:3000

EXPOSE 3000

CMD ["npm", "start"]

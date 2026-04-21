FROM node:20-alpine

WORKDIR /home/node/app

COPY package.json ./

RUN npm install && npm cache clean --force

COPY knexfile.js ./
COPY migrations ./migrations
COPY seeds ./seeds
COPY src ./src

EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && npm run seed && node src/index.js"]
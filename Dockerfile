FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

ARG DEFAULT_PORT=3000
ENV PORT $DEFAULT_PORT
EXPOSE $PORT

RUN yarn build

CMD [ "yarn", "start:prod" ]

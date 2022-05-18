FROM node:16

WORKDIR /usr/src/app

ENV PORT 8080

COPY package*.json ./

RUN npm install --only=prod

COPY . .

CMD npm start
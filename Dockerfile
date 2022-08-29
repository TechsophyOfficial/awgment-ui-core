FROM node:12.6.0-alpine

RUN apk update && apk add git

RUN mkdir /ui-core

COPY . /ui-core
LABEL author="Sandeep Vemuganti"

WORKDIR /ui-core

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]

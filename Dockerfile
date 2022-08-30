FROM node:12.6.0-alpine

RUN apk update && apk add git

RUN mkdir /ui-core

COPY . /ui-core

LABEL author="Sandeep Vemuganti"

WORKDIR /ui-core

COPY package*.json .

RUN npm install --global windows-build-tools

COPY . .

CMD ["npm", "start"]

FROM node:17.2.0

LABEL author="Sandeep Vemuganti"

WORKDIR /ui-core

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]

FROM node:12.6.0-alpine

RUN apk update && apk add git

RUN mkdir /ui-core

COPY . /ui-core
LABEL author="Sandeep Vemuganti"

WORKDIR /ui-core

COPY package*.json ./

RUN npm install

COPY ./ /ui-core

RUN npm run build

#COPY --from=build /ui-core .
#COPY --from=build /ui-core/nginx/nginx.conf /etc/nginx/nginx.conf

#EXPOSE 80

CMD ["npm", "start"]

#ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:16

WORKDIR /service
COPY package*.json ./

RUN yarn install
RUN yarn global add @linbop/modulify

COPY repositories/project-rest ./repositories/project-rest
COPY repositories/proto ./repositories/proto
COPY repositories/types ./repositories/types
COPY config.modulify.js ./config.modulify.js

WORKDIR /service/repositories/project-rest
RUN yarn install

EXPOSE 3001

WORKDIR /service

CMD modulify call start repositories/project-rest
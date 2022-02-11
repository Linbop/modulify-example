FROM node:16

WORKDIR /service
COPY package*.json ./

RUN yarn install
RUN yarn global add @linbop/modulify

COPY repositories/project-grpc ./repositories/project-grpc
COPY repositories/proto ./repositories/proto
COPY repositories/types ./repositories/types
COPY config.modulify.js ./config.modulify.js

WORKDIR /service/repositories/project-grpc
RUN yarn install

EXPOSE 50051

WORKDIR /service
CMD modulify call start repositories/project-grpc
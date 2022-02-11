import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from 'path';
// import {message as PROTO_PATH} from '@linbop/proto';
 
const PROTO_PATH = path.join(__dirname, "../../proto/message.proto");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const messageProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService((messageProto.MessageService as any).service, {
  getMessage: (_, callback) => {
    console.log('==', new Date().valueOf())
    callback(null, {
      title: 'Message',
      content: 'Lorem ipsum dolor sit amet'
    });
  }
});

server.bindAsync(
  // "127.0.0.1:50051",
  "project-grpc:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
 
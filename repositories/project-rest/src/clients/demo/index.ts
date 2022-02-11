import * as grpc from "@grpc/grpc-js";
import * as  protoLoader from "@grpc/proto-loader";
import path from 'path';
const PROTO_PATH = path.join(__dirname, '../../proto/message.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const MessageService: any = grpc.loadPackageDefinition(packageDefinition).MessageService;

const client = new MessageService(
  // "localhost:50051",
  "project-grpc:50051",
  grpc.credentials.createInsecure()
);

export default client;
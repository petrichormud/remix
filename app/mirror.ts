import { credentials } from "@grpc/grpc-js";
import { MirrorClient } from "./proto/mirror_grpc_pb";

export const client = new MirrorClient(
  "localhost:8009",
  credentials.createInsecure()
);

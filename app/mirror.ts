import { credentials } from "@grpc/grpc-js";
import { MirrorClient } from "./proto/mirror_grpc_pb";

export const mirrorClient = new MirrorClient(
  "localhost:8009",
  credentials.createInsecure()
);

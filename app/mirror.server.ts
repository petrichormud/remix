import { credentials } from "@grpc/grpc-js";
import { MirrorClient } from "~/proto/mirror.grpc-client";

// TODO: Pull this address out of ENV configuration
export const client = new MirrorClient(
  "localhost:8009",
  credentials.createInsecure()
);

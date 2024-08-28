import { credentials } from "@grpc/grpc-js";

import { DataClient } from "~/proto/data.grpc-client";
import { type ReleasedPatchesReply } from "~/proto/data";

export const client = new DataClient(
  "localhost:8008",
  credentials.createInsecure()
);

export async function releasedPatches(kind: string) {
  return new Promise<ReleasedPatchesReply>((resolve, reject) => {
    client.releasedPatches({ kind }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("releasedPatchesReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

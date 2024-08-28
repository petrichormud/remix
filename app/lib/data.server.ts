import { credentials } from "@grpc/grpc-js";

import { DataClient } from "~/proto/data.grpc-client";
import type {
  PatchesReply,
  ReleasedPatchesReply,
  MostRecentPatchReply,
  PatchReply,
} from "~/proto/data";

export const client = new DataClient(
  "localhost:8008",
  credentials.createInsecure()
);

export async function patches(kind: string) {
  return new Promise<PatchesReply>((resolve, reject) => {
    client.patches({ kind }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("patchesReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

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

export async function mostRecentPatch(kind: string) {
  return new Promise<MostRecentPatchReply>((resolve, reject) => {
    client.mostRecentPatch({ kind }, (err, reply) => {
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

export async function patchByID(id: number) {
  return new Promise<PatchReply>((resolve, reject) => {
    client.patch({ id: BigInt(id) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("patchReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

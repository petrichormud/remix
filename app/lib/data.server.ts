import { credentials } from "@grpc/grpc-js";

import { DataClient } from "~/proto/data.grpc-client";
import type {
  CreatePatchChangeReply,
  DeletePatchChangeReply,
  PatchesReply,
  ReleasedPatchesReply,
  MostRecentPatchReply,
  PatchReply,
  MarkPatchReleasedReply,
} from "~/proto/data";

export const client = new DataClient(
  "localhost:8008",
  credentials.createInsecure()
);

export async function createPatchChange(
  pcid: number | string,
  title: string,
  text: string
) {
  return new Promise<CreatePatchChangeReply>((resolve, reject) => {
    client.createPatchChange(
      { pcid: BigInt(pcid), title, text },
      (err, reply) => {
        if (err) {
          reject(err);
          return;
        }

        if (!reply) {
          // TODO: Create an error here
          reject("createPatchChangeReply is null");
          return;
        }

        resolve(reply);
      }
    );
  });
}

export async function deletePatchChange(id: number | string) {
  return new Promise<DeletePatchChangeReply>((resolve, reject) => {
    client.deletePatchChange({ id: BigInt(id) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("deletePatchChangeReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

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

export async function markPatchReleased(id: string | number) {
  return new Promise<MarkPatchReleasedReply>((resolve, reject) => {
    client.markPatchReleased({ id: BigInt(id) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("markPatchReleasedReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

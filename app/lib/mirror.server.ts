import { credentials } from "@grpc/grpc-js";

import { MirrorClient } from "~/proto/mirror.grpc-client";
import {
  type PlayerSettingsReply,
  type SetPlayerSettingsThemeReply,
  type PlayersReply,
  type PlayerPermissionDefinitionsReply,
  type PlayerPermissionsReply,
} from "~/proto/mirror";
import type { Theme } from "~/lib/theme";

export const client = new MirrorClient(
  "localhost:8009",
  credentials.createInsecure()
);

export async function playerSettings(pid: number) {
  return new Promise<PlayerSettingsReply>((resolve, reject) => {
    client.playerSettings({ pid: BigInt(pid) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("playerSettingsThemeReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function setPlayerSettingsTheme(pid: number, theme: Theme) {
  return new Promise<SetPlayerSettingsThemeReply>((resolve, reject) => {
    client.setPlayerSettingsTheme({ pid: BigInt(pid), theme }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("setPlayerSettingsThemeReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function players() {
  return new Promise<PlayersReply>((resolve, reject) => {
    client.players({}, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("playersReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function playerPermissionDefinitions() {
  return new Promise<PlayerPermissionDefinitionsReply>((resolve, reject) => {
    client.playerPermissionDefinitions({}, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("playerPermissionDefinitionsReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function playerPermissions(pid: number) {
  return new Promise<PlayerPermissionsReply>((resolve, reject) => {
    client.playerPermissions({ pid: BigInt(pid) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("playerPermissionsReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

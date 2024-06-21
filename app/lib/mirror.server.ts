import { credentials } from "@grpc/grpc-js";

import { MirrorClient } from "~/proto/mirror.grpc-client";
import type {
  PlayerSettingsReply,
  SetPlayerSettingsThemeReply,
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

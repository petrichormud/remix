import { client } from "~/mirror.server";
import type { PlayerSettingsReply } from "~/proto/mirror";

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

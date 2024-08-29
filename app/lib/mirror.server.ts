import { credentials } from "@grpc/grpc-js";

import { MirrorClient } from "~/proto/mirror.grpc-client";
import type {
  PlayerUsernameReply,
  PlayerSettingsReply,
  SetPlayerSettingsThemeReply,
  PlayersReply,
  PlayerPermissionDefinitionsReply,
  PlayerPermissionsReply,
  GrantPlayerPermissionReply,
  ListEmailsForPlayerReply,
  CreateEmailReply,
  DeleteEmailReply,
} from "~/proto/mirror";
import type { Theme } from "~/lib/theme";

export const client = new MirrorClient(
  "localhost:8009",
  credentials.createInsecure()
);

export async function playerUsername(pid: number | string) {
  return new Promise<PlayerUsernameReply>((resolve, reject) => {
    client.playerUsername({ pid: BigInt(pid) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("playerUsernameReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

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

export async function grantPlayerPermission(
  pid: number,
  ipid: number,
  name: string
) {
  return new Promise<GrantPlayerPermissionReply>((resolve, reject) => {
    client.grantPlayerPermission(
      { pid: BigInt(pid), ipid: BigInt(ipid), name },
      (err, reply) => {
        if (err) {
          reject(err);
          return;
        }

        if (!reply) {
          // TODO: Create an error here
          reject("grantPlayerPermissionReply is null");
          return;
        }

        resolve(reply);
      }
    );
  });
}

export async function revokePlayerPermission(
  pid: number | string,
  ipid: number | string,
  name: string
) {
  return new Promise<GrantPlayerPermissionReply>((resolve, reject) => {
    client.revokePlayerPermission(
      { pid: BigInt(pid), ipid: BigInt(ipid), name },
      (err, reply) => {
        if (err) {
          reject(err);
          return;
        }

        if (!reply) {
          // TODO: Create an error here
          reject("revokePlayerPermissionReply is null");
          return;
        }

        resolve(reply);
      }
    );
  });
}

export async function listEmailsForPlayer(pid: number | string) {
  return new Promise<ListEmailsForPlayerReply>((resolve, reject) => {
    client.listEmailsForPlayer({ pid: BigInt(pid) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("revokePlayerPermissionReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function createEmail(pid: number | string, address: string) {
  return new Promise<CreateEmailReply>((resolve, reject) => {
    client.createEmail({ pid: BigInt(pid), address }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("revokePlayerPermissionReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

export async function deleteEmail(pid: number | string, id: number | string) {
  return new Promise<DeleteEmailReply>((resolve, reject) => {
    client.deleteEmail({ pid: BigInt(pid), id: BigInt(id) }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("revokePlayerPermissionReply is null");
        return;
      }

      resolve(reply);
    });
  });
}

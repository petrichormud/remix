import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";

import type { LoginReply } from "~/proto/mirror";
import { getSession, commitSession } from "~/lib/sessions.server";
import { client, playerSettings } from "~/lib/mirror.server";
import { serializeTheme } from "~/lib/theme.server";
import { isTheme } from "~/lib/theme";

type Credentials = {
  username?: string;
  passphrase?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    return redirect("/");
  }

  const form = await request.formData();
  const { username, passphrase }: Credentials = Object.fromEntries(form);

  if (!username || !passphrase) {
    return json({ error: true });
  }

  // TODO: Get this in a function
  const loginPromise = new Promise<LoginReply>((resolve, reject) => {
    client.login({ username, passphrase }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("login reply is null");
        return;
      }

      resolve(reply);
    });
  });

  try {
    const headers = new Headers();
    const loginReply = await loginPromise;
    const pid = Number(loginReply.id);
    if (pid <= 0) {
      return json({ error: true });
    }
    session.set("pid", pid);
    headers.append("Set-Cookie", await commitSession(session));

    const playerSettingsReply = await playerSettings(pid);
    if (isTheme(playerSettingsReply.theme)) {
      headers.append(
        "Set-Cookie",
        await serializeTheme(playerSettingsReply.theme)
      );
    }

    return redirect("/", { headers });
  } catch (err) {
    return json({ error: true });
  }
}

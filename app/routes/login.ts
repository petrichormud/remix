import { type ActionFunctionArgs, json } from "@remix-run/node";

import type { LoginReply } from "~/proto/mirror";
import { getSession, commitSession } from "~/lib/sessions.server";
import { client, playerSettings } from "~/lib/mirror.server";
import { serializeTheme } from "~/lib/theme.server";
import { isTheme } from "~/lib/theme";

type Credentials = {
  username?: string;
  password?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    const pid = session.get("pid");
    return json({ pid, ok: true });
  }

  const form = await request.formData();
  const { username, password }: Credentials = Object.fromEntries(form);

  if (!username || !password) {
    return json(
      { ok: false },
      {
        status: 401,
        headers: {
          "Content-Length": "0",
        },
      }
    );
  }

  const loginPromise = new Promise<LoginReply>((resolve, reject) => {
    client.login({ username, password }, (err, reply) => {
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
      return json(
        { ok: false },
        {
          status: 401,
        }
      );
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

    return json({ pid, ok: true }, { headers });
  } catch (err) {
    return json(
      { ok: false },
      {
        status: 401,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
}

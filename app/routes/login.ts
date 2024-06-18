import { type ActionFunctionArgs, json } from "@remix-run/node";

import { getSession, commitSession } from "~/sessions.server";
import { client } from "~/mirror.server";
import { LoginReply } from "~/proto/mirror";

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
    return json(
      { pid, ok: true },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
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

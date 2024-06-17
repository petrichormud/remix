import type { ActionFunctionArgs } from "@remix-run/node";
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
    return { pid };
  }

  const form = await request.formData();
  const { username, password }: Credentials = Object.fromEntries(form);

  if (!username || !password) {
    return new Response(null, {
      status: 401,
      headers: {
        "Content-Length": "0",
      },
    });
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
      return new Response(null, {
        status: 401,
        headers: {
          "Content-Length": "0",
        },
      });
    }
    session.set("pid", pid);
    return new Response(null, {
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Length": "0",
      },
    });
  } catch (err) {
    session.flash("loginError", "Could not log you in, sorry!");
    return new Response(null, {
      status: 401,
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Length": "0",
      },
    });
  }
}

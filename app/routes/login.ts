import type { ActionFunctionArgs } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";
import { client } from "~/mirror.server";
import { LoginRequest } from "~/proto/mirror";

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

  let pid = 0;
  client.login({ username, password }, (err, reply) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!reply) {
      console.log("login reply is null");
      return;
    }

    pid = Number(reply.id);
  });

  if (pid > 0) {
    session.set("pid", pid);
    return new Response(null, {
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Length": "0",
      },
    });
  }

  return new Response(null, {
    status: 401,
    headers: {
      "Content-Length": "0",
    },
  });
}

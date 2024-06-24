import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";

import type { RegisterReply } from "~/proto/mirror";
import { getSession, commitSession } from "~/lib/sessions.server";
import { client } from "~/lib/mirror.server";

type Credentials = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    return redirect("/");
  }

  const form = await request.formData();
  const { username, password, confirmPassword }: Credentials =
    Object.fromEntries(form);

  // TODO: Implement better error responses
  if (
    !username ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    return json({ error: true });
  }

  // TODO: Get this into a function on mirror.server
  const promise = new Promise<RegisterReply>((resolve, reject) => {
    client.register({ username, password }, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }

      if (!reply) {
        // TODO: Create an error here
        reject("register reply is null");
        return;
      }

      resolve(reply);
    });
  });

  try {
    const reply = await promise;
    const pid = Number(reply.id);
    if (pid <= 0) {
      return json({ error: true });
    }
    session.set("pid", pid);
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (err) {
    return json(
      { error: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }
}

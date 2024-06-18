import { type ActionFunctionArgs, json } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";
import { client } from "~/mirror.server";
import { RegisterReply } from "~/proto/mirror";

type Credentials = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    return json({ ok: true });
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
    return json({ ok: false });
  }

  const promise = new Promise<RegisterReply>((resolve, reject) => {
    client.register({ username, password }, (err, reply) => {
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
    const reply = await promise;
    const pid = Number(reply.id);
    if (pid <= 0) {
      return json({ ok: false });
    }
    session.set("pid", pid);
    return json(
      { ok: true },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  } catch (err) {
    session.flash("registerError", "Could not log you in, sorry!");
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

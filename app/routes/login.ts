import type { ActionFunctionArgs } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    const pid = session.get("pid");
    return { pid };
  }

  if (username === "test" && password === "T3sted_tested") {
    session.set("pid", 1);
    return new Response(null, {
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Length": "0",
      },
    });
  } else {
    return new Response(null, {
      status: 401,
      headers: {
        "Content-Length": "0",
      },
    });
  }
}

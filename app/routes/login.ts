import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  if (username === "test" && password === "T3sted_tested") {
    return json({ pid: 1 });
  } else {
    return new Response(null, {
      status: 401,
      headers: {
        "Content-Length": "0",
      },
    });
  }
}

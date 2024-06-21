import { type ActionFunctionArgs, json } from "@remix-run/node";

import { isTheme } from "~/lib/theme";
import { serializeTheme } from "~/lib/theme.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme");
  if (!isTheme(theme)) {
    throw new Response("Bad Request", { status: 400 });
  }

  return json(
    {},
    {
      headers: { "Set-Cookie": await serializeTheme(theme) },
    }
  );
}

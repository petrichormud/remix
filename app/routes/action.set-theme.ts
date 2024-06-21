import { type ActionFunctionArgs, json } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { isTheme } from "~/lib/theme";
import { serializeTheme } from "~/lib/theme.server";
import { setPlayerSettingsTheme } from "~/lib/mirror.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const theme = formData.get("theme");
  if (!isTheme(theme)) {
    throw new Response("Bad Request", { status: 400 });
  }

  const pid = session.get("pid");
  if (pid) {
    try {
      await setPlayerSettingsTheme(pid, theme);
    } catch (err) {
      console.error(err);
    }
  }

  return json(
    {},
    {
      headers: { "Set-Cookie": await serializeTheme(theme) },
    }
  );
}

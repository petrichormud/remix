import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";

export const DEFAULT_SETTINGS_PATH = "/settings/account";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  return redirect(DEFAULT_SETTINGS_PATH);
};

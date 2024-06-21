import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }

  // TODO: Get this declarative in a shared constant
  return redirect("/settings/account");
};

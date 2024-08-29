import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { deleteEmail } from "~/lib/mirror.server";

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }
  if (!params.id) {
    return redirect("/");
  }
  // TODO: Handle any errors here
  await deleteEmail(pid, params.id);
  return redirect("/settings/account");
};

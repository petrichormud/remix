import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";

export const DEFAULT_PATH = "/permissions";

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) return redirect("/");

  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  const permissionsReply = await playerPermissions(pid);
  if (
    !permissionsReply.names.includes("grant-all") ||
    !permissionsReply.names.includes("revoke-all")
  ) {
    return redirect("/");
  }

  if (!params.id) {
    return redirect("/");
  }

  return redirect(`/players/${params.id}${DEFAULT_PATH}`);
};

import { type ActionFunction, redirect, json } from "@remix-run/node";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { markPatchReleased, patchByID } from "~/lib/wish.server";
import { playerPermissions } from "~/lib/mirror.server";

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }
  const permissionsReply = await playerPermissions(pid);
  const permissions = new PlayerPermissions(permissionsReply.names);
  if (!params.id || !params.kind) {
    return redirect("/");
  }
  const patchReply = await patchByID(parseInt(params.id));
  if (!patchReply.patch) {
    // TODO: Render a 500 page instead?
    return redirect("/changes");
  }
  if (!permissions.has("release-changelog")) {
    return json({ error: "forbidden" });
  }
  await markPatchReleased(params.id);

  return redirect(`/changes/${params.kind}/${params.id}`);
};

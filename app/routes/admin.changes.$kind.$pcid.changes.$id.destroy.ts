import { type ActionFunction, redirect, json } from "@remix-run/node";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { deletePatchChange, patchByID } from "~/lib/wish.server";
import { playerPermissions } from "~/lib/mirror.server";

interface DeleteChangeActionInput {
  id?: string;
}

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
  if (!params.pcid || !params.kind || !params.id) {
    return redirect("/");
  }
  const patchReply = await patchByID(parseInt(params.pcid));
  // TODO: Do some validation on the patch here
  if (!patchReply.patch) {
    // TODO: Render a 500 page instead?
    return redirect("/admin/changes");
  }
  const form = await request.formData();
  const { id }: DeleteChangeActionInput = Object.fromEntries(form);
  if (!id) {
    return json({ error: "change ID is required" });
  }
  if (!permissions.has("create-changelog-change")) {
    return json({ error: "forbidden" });
  }
  await deletePatchChange(id);

  return redirect(`/admin/changes/${params.kind}/${params.pcid}`);
};

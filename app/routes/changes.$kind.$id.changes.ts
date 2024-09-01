import { type ActionFunction, redirect, json } from "@remix-run/node";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { createPatchChange, patchByID } from "~/lib/wish.server";
import { playerPermissions } from "~/lib/mirror.server";

interface NewChangeActionInput {
  title?: string;
  text?: string;
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
  if (!params.id || !params.kind) {
    return redirect("/");
  }
  const patchReply = await patchByID(parseInt(params.id));
  if (!patchReply.patch) {
    // TODO: Render a 500 page instead?
    return redirect("/changes");
  }
  const form = await request.formData();
  const { title, text }: NewChangeActionInput = Object.fromEntries(form);
  if (!title) {
    return json({ error: "title is required" });
  }
  if (!text) {
    return json({ error: "text is required" });
  }
  if (!permissions.has("create-changelog-change")) {
    return json({ error: "forbidden" });
  }
  await createPatchChange(params.id, title, text);

  return redirect(`/changes/${params.kind}/${params.id}`);
};

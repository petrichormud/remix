import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { mostRecentPatch, createPatch } from "~/lib/wish.server";
import { PlayerPermissions } from "~/lib/permissions";

interface NewPatchActionInput {
  kind?: string;
  major?: string;
  minor?: string;
  patch?: string;
}

export const action: ActionFunction = async ({ request }) => {
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
  if (!permissions.has("create-changelog")) {
    return { error: "forbidden" };
  }
  const form = await request.formData();
  // TODO: Run some validation here
  const { kind, major, minor, patch }: NewPatchActionInput =
    Object.fromEntries(form);
  if (!kind) {
    return { error: "patch kind is required" };
  }
  if (!major) {
    return { error: "patch major version is required" };
  }
  if (!minor) {
    return { error: "patch minor version is required" };
  }
  if (!patch) {
    return { error: "patch patch version is required" };
  }
  const reply = await createPatch(kind, major, minor, patch);
  return redirect(`/admin/changes/${kind}/${reply.id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    // TODO: Render a 404 page instead
    return redirect("/");
  }

  const reply = await mostRecentPatch("game");
  if (!reply.patch) {
    // TODO: Render a 500 page instead
    return redirect("/");
  }

  return redirect(`/admin/changes/game/${reply.patch.id}`);
};

import { type LoaderFunction, redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { mostRecentPatch } from "~/lib/wish.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    // TODO: Render a 404 page instead
    return redirect("/");
  }

  if (!params.kind) {
    // TODO: Render a 500 page instead
    return redirect("/");
  }

  const reply = await mostRecentPatch(params.kind);
  if (!reply.patch) {
    // TODO: Render a 500 page instead
    return redirect("/");
  }

  return redirect(`/changes/${params.kind}/${reply.patch.id}`);
};

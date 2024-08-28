import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { mostRecentPatch } from "~/lib/data.server";
// import { patchVersion } from "~/lib/patches";

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

  return redirect(`/changes/game/${reply.patch.id}`);
};

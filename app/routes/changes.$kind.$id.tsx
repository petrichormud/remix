import { useLoaderData } from "@remix-run/react";
import { type LoaderFunction, redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { patchByID } from "~/lib/data.server";
import { playerPermissions } from "~/lib/mirror.server";
import { patchVersion, serializePatch } from "~/lib/patches";
import { Separator } from "~/components/ui/separator";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    // TODO: Render a 404 page instead
    return redirect("/");
  }

  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }
  const permissionsReply = await playerPermissions(pid);
  // TODO: Check permissions

  if (!params.id) {
    // TODO: Render a 500 page instead
    return redirect("/");
  }

  const patchReply = await patchByID(parseInt(params.id));
  if (!patchReply.patch) {
    // TODO: Render a 500 page instead
    return redirect("/");
  }

  // TODO: Create a helper to do this conversion
  return {
    patch: serializePatch(patchReply.patch),
    permissionNames: permissionsReply.names,
  };
};

export default function Changelog() {
  const { patch } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {patch.kind === "game" ? "Game" : "Client"} Patch{" "}
          {patchVersion(patch)}
        </h3>
        <p className="text-sm text-muted-foreground pb-3">
          Manage and update this patch here.
        </p>
        <Separator />
      </div>
      <div className="space-y-2 md:w-[24rem]"></div>
    </div>
  );
}

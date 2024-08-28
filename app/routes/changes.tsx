import type {
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Check, Ellipsis } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { PlayerPermissions } from "~/lib/permissions";
import { patches } from "~/lib/data.server";
import { serializePatch, patchVersion } from "~/lib/patches";
import { Header } from "~/components/header";
import { Label } from "~/components/ui/label";
import { SidebarNav } from "~/components/ui/sidebar-nav";
import { Separator } from "~/components/ui/separator";

import tailwind from "~/styles/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "PetrichorMUD" },
    { name: "description", content: "A modern take on a retro-style MUD" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwind }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) return redirect("/");

  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  const permissionsReply = await playerPermissions(pid);
  // TODO: Combine these into a single call
  const gamePatchesReply = await patches("game");
  const clientPatchesReply = await patches("client");
  const gamePatches = gamePatchesReply.patches.map((patch) =>
    serializePatch(patch)
  );
  const clientPatches = clientPatchesReply.patches.map((patch) =>
    serializePatch(patch)
  );

  return {
    pid,
    permissionNames: permissionsReply.names,
    patches: {
      game: gamePatches,
      client: clientPatches,
    },
  };
}

export default function Changelogs() {
  const { pid, permissionNames, patches } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  const gamePatchNavItems = patches.game.map((patch) => {
    return {
      Icon: patch.released ? Check : Ellipsis,
      title: `Patch ${patchVersion(patch)}`,
      to: `/changes/game/${patch.id}`,
    };
  });
  const clientPatchNavItems = patches.client.map((patch) => {
    return {
      Icon: patch.released ? Check : Ellipsis,
      title: `Patch ${patchVersion(patch)}`,
      to: `/changes/client/${patch.id}`,
    };
  });

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main className="flex justify-center items-center">
        <div className="w-full max-w-screen-2xl space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Changelogs</h2>
            <p className="text-muted-foreground">
              View and manage product changelogs
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <Label>Game Changelog</Label>
              <SidebarNav items={gamePatchNavItems} />
              <Separator className="my-6" />
              <Label>Client Changelog</Label>
              <SidebarNav items={clientPatchNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

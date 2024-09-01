import type {
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Check } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { releasedPatches } from "~/lib/wish.server";
import { PlayerPermissions } from "~/lib/permissions";
import {
  patchVersion,
  serializePatch,
  type SerializedPatch,
  type SerializedPatchChange,
} from "~/lib/patches";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

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

// TODO: Share this permissions filtering
export const loader: LoaderFunction = async ({ request }) => {
  const gamePatchesReply = await releasedPatches("game");
  const clientPatchesReply = await releasedPatches("client");
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    const pid = session.get("pid");
    if (!pid) {
      return {
        pid: 0,
        permissionNames: [],
        patches: {
          game: gamePatchesReply.patches.map((patch) => serializePatch(patch)),
          client: clientPatchesReply.patches.map((patch) =>
            serializePatch(patch)
          ),
        },
      };
    }
    const permissionsReply = await playerPermissions(pid);
    return {
      pid,
      permissionNames: permissionsReply.names,
      patches: {
        game: gamePatchesReply.patches.map((patch) => serializePatch(patch)),
        client: clientPatchesReply.patches.map((patch) =>
          serializePatch(patch)
        ),
      },
    };
  } else {
    return {
      pid: 0,
      permissionNames: [],
      patches: {
        game: gamePatchesReply.patches.map((patch) => serializePatch(patch)),
        client: clientPatchesReply.patches.map((patch) =>
          serializePatch(patch)
        ),
      },
    };
  }
};

export default function Changelog() {
  const { pid, permissionNames, patches } = useLoaderData<typeof loader>();
  const permissions = pid ? new PlayerPermissions(permissionNames) : undefined;
  return (
    <>
      <Header pid={pid} permissions={permissions} noBlur />
      <main className="container flex flex-col gap-6 mb-24 sm:mb-10">
        <section id="game">
          <h1 className="mt-24 text-4xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            Changelog
          </h1>
          {patches.game.length ? (
            patches.game.map((patch: SerializedPatch) => (
              <PatchSection key={patch.id} patch={patch} />
            ))
          ) : (
            <div className="pt-10 sm:pt-6 text-muted-foreground">
              There haven&apos;t been any patches yet. Check back soon!
            </div>
          )}
        </section>
        <section id="client">
          <h1 className="mt-24 text-4xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            Client Changelog
          </h1>
          {patches.client.length ? (
            patches.client.map((patch: SerializedPatch) => (
              <PatchSection key={patch.id} patch={patch} />
            ))
          ) : (
            <div className="pt-10 sm:pt-6 text-muted-foreground">
              There haven&apos;t been any patches yet. Check back soon!
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

interface PatchSectionProps {
  patch: SerializedPatch;
}

function PatchSection({ patch }: PatchSectionProps) {
  return (
    <div className="pt-10 sm:pt-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Patch {patchVersion(patch)}
      </h2>
      <div className="gap-2">
        {patch.changes.map((change: SerializedPatchChange) => (
          <PatchChangeCard key={change.id} change={change} />
        ))}
      </div>
    </div>
  );
}

interface PatchChangeCardProps {
  change: SerializedPatchChange;
}

function PatchChangeCard({ change }: PatchChangeCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 shadow-sm md:max-w-[50%]">
      <Check className="h-6 w-6" />
      <div className="space-y-1">
        <h4 className="text-sm leading-none">{change.title}</h4>
        <p className="text-xs text-muted-foreground">{change.text}</p>
      </div>
    </div>
  );
}

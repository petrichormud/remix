import { useState } from "react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useFetcher, Form } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import { Check, Ellipsis } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { PlayerPermissions } from "~/lib/permissions";
import { patches } from "~/lib/data.server";
import {
  serializePatch,
  patchVersion,
  type SerializedPatch,
} from "~/lib/patches";
import { Header } from "~/components/header";
import { Label } from "~/components/ui/label";
import { SidebarNav } from "~/components/ui/sidebar-nav";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { action } from "~/routes/changes._index";

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

export const loader: LoaderFunction = async ({ request }) => {
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
};

export default function Changelogs() {
  const { pid, permissionNames, patches } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  const gamePatchNavItems = patches.game.map((patch: SerializedPatch) => {
    return {
      Icon: patch.released ? Check : Ellipsis,
      title: patchVersion(patch),
      to: `/changes/game/${patch.id}`,
    };
  });
  const clientPatchNavItems = patches.client.map((patch: SerializedPatch) => {
    return {
      Icon: patch.released ? Check : Ellipsis,
      title: patchVersion(patch),
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
              <div className="py-6">
                <NewPatchDialog kind="game">
                  <Button>New Patch</Button>
                </NewPatchDialog>
              </div>
              <SidebarNav items={gamePatchNavItems} />
              <Separator className="my-6" />
              <Label>Client Changelog</Label>
              <div className="py-6">
                <NewPatchDialog kind="client">
                  <Button>New Client Patch</Button>
                </NewPatchDialog>
              </div>
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

interface NewPatchDialogProps extends React.PropsWithChildren {
  kind: string;
}

function NewPatchDialog({ kind, children }: NewPatchDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [patch, setPatch] = useState("");
  const fetcher = useFetcher<typeof action>({
    key: "new-patch",
  });

  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>New Patch Change</DialogTitle>
              <DialogDescription>
                Enter a title and text for this change
              </DialogDescription>
              {fetcher.data?.error ? "Sorry, something went wrong." : null}
            </DialogHeader>
            <PatchForm
              kind={kind}
              major={major}
              setMajor={setMajor}
              minor={minor}
              setMinor={setMinor}
              patch={patch}
              setPatch={setPatch}
            />
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                form="new-patch"
                type="submit"
                // TODO: Validate the versions and disable button if needed
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
}

interface PatchFormProps {
  kind: string;
  major: string;
  setMajor: React.Dispatch<React.SetStateAction<string>>;
  minor: string;
  setMinor: React.Dispatch<React.SetStateAction<string>>;
  patch: string;
  setPatch: React.Dispatch<React.SetStateAction<string>>;
}

function PatchForm({
  kind,
  major,
  setMajor,
  minor,
  setMinor,
  patch,
  setPatch,
}: PatchFormProps) {
  return (
    <Form
      action="/changes"
      method="post"
      id="new-patch"
      className="flex flex-col gap-4"
      navigate={false}
      fetcherKey="new-patch"
      replace
      reloadDocument
    >
      <Input className="hidden aria-hidden" name="kind" value={kind} readOnly />
      <div>
        <Label htmlFor="new-patch-major" className="text-right">
          Major Version
        </Label>
        <Input
          id="new-patch-major"
          name="major"
          value={major}
          onChange={(e) => {
            // TODO: Sanitize this to just numbers
            setMajor(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="new-patch-minor" className="text-right">
          Minor Version
        </Label>
        <Input
          id="new-patch-minor"
          name="minor"
          value={minor}
          onChange={(e) => {
            // TODO: Sanitize this to just numbers
            setMinor(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="new-patch-patch" className="text-right">
          Patch Version
        </Label>
        <Input
          id="new-patch-patch"
          name="patch"
          value={patch}
          onChange={(e) => {
            // TODO: Sanitize this to just numbers
            setPatch(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}

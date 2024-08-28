import { useState } from "react";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import {
  type LoaderFunction,
  type ActionFunction,
  redirect,
  json,
} from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { CirclePlus, Check } from "lucide-react";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { createPatchChange, patchByID } from "~/lib/data.server";
import { playerPermissions } from "~/lib/mirror.server";
import {
  patchVersion,
  serializePatch,
  type SerializedPatchChange,
} from "~/lib/patches";
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
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

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

  return null;
};

export default function Changelog() {
  const { patch, permissionNames } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);
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
      {permissions.has("create-changelog-change") ? (
        <PatchChangeDialog>
          <Button>
            <CirclePlus className="mr-2 h-4 w-4" />
            New Change
          </Button>
        </PatchChangeDialog>
      ) : null}
      {patch.changes.map((change: SerializedPatchChange) => {
        return <PatchChange key={change.id} change={change} />;
      })}
    </div>
  );
}

interface PatchChangeProps {
  change: SerializedPatchChange;
}

function PatchChange({ change }: PatchChangeProps) {
  return (
    <div className="flex items-center rounded-lg border p-3 shadow-sm">
      <Check className="mr-3 h-6 w-6" />
      <div className="space-y-1">
        <h4 className="text-sm leading-none">{change.title}</h4>
        <p className="text-xs text-muted-foreground">{change.text}</p>
      </div>
    </div>
  );
}

function PatchChangeDialog({ children }: React.PropsWithChildren) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const fetcher = useFetcher<typeof action>({ key: "new-patch-change" });

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
              {fetcher.data?.error ? "Sorry, couldn't log you in." : null}
            </DialogHeader>
            <PatchChangeForm
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
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
                form="new-patch-change"
                type="submit"
                // TODO: Validate these both here
                disabled={!(title.length && text.length)}
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

interface PatchChangeFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function PatchChangeForm({
  title,
  setTitle,
  text,
  setText,
}: PatchChangeFormProps) {
  return (
    <Form
      method="post"
      id="new-patch-change"
      className="flex flex-col gap-4"
      navigate={false}
      fetcherKey="new-patch-change"
      reloadDocument
      replace
    >
      <div>
        <Label htmlFor="new-patch-change-title" className="text-right">
          Title
        </Label>
        <Input
          id="new-patch-change-title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="new-patch-change-text" className="text-right">
          Text
        </Label>
        <Input
          id="new-patch-change-text"
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}

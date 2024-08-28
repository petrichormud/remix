import { useState } from "react";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import { type LoaderFunction, redirect } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { CirclePlus, Check, Send } from "lucide-react";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { patchByID } from "~/lib/data.server";
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
import { action as newChangeAction } from "~/routes/changes.$kind.$id.changes";

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
      <div className="flex gap-2">
        {permissions.has("create-changelog-change") && !patch.released ? (
          <NewPatchChangeDialog>
            <Button variant="outline">
              <CirclePlus className="mr-2 h-4 w-4" />
              New Change
            </Button>
          </NewPatchChangeDialog>
        ) : null}
        {permissions.has("release-changelog") && !patch.released ? (
          <NewPatchChangeDialog>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Release Patch
            </Button>
          </NewPatchChangeDialog>
        ) : null}
      </div>
      {patch.changes.map((change: SerializedPatchChange) => {
        return <PatchChangeCard key={change.id} change={change} />;
      })}
    </div>
  );
}

interface PatchChangeCardProps {
  change: SerializedPatchChange;
}

// TODO: Check permissions for delete/edit
function PatchChangeCard({ change }: PatchChangeCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3 shadow-sm">
      <Check className="h-6 w-6" />
      <div className="space-y-1">
        <h4 className="text-sm leading-none">{change.title}</h4>
        <p className="text-xs text-muted-foreground">{change.text}</p>
      </div>
      <div className="ml-auto">
        <DeletePatchChangeDialog id={change.id}>
          <Button variant="destructive">Delete</Button>
        </DeletePatchChangeDialog>
      </div>
    </div>
  );
}

function NewPatchChangeDialog({ children }: React.PropsWithChildren) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const fetcher = useFetcher<typeof newChangeAction>({
    key: "new-patch-change",
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
      action="changes"
      method="post"
      id="new-patch-change"
      className="flex flex-col gap-4"
      navigate={false}
      fetcherKey="new-patch-change"
      replace
      reloadDocument
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

interface DeletePatchChangeDialogProps extends React.PropsWithChildren {
  id: string;
}

function DeletePatchChangeDialog({
  id,
  children,
}: DeletePatchChangeDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO: Add a fetcher key for catching errors
  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Delete This Change?</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
            </DialogHeader>
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
              <Form
                action={`changes/${id}/destroy`}
                method="post"
                className="ml-auto"
                navigate={false}
                fetcherKey="delete-patch-change"
                reloadDocument
                replace
              >
                <input className="hidden aria-hidden" name="id" value={id} />
                <Button variant="destructive">Delete</Button>
              </Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
}

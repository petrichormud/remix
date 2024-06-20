import { useState } from "react";
import { CircleAlert, Mail } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { Separator } from "~/components/ui/separator";
import { Button, buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground pb-3">
          Manage your account settings here.
        </p>
        <Separator />
      </div>
      <div className="space-y-2 md:w-[24rem]">
        <Label>Username</Label>
        <Input value="test" disabled />
        <p className="text-xs leading-none text-muted-foreground">
          Your username cannot be changed.
        </p>
      </div>
      <div className="space-y-2 md:w-[24rem]">
        <Label>Emails</Label>
        <Email email="email@web.site" verified />
        <Email email="email@web.site" verified />
        <Email email="email@web.site" verified={false} />
      </div>
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="flex gap-2 items-center">
          <Label className="md:min-w-60">
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </Label>
          <Label className="md:min-w-60">
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </Label>
        </div>
      </div>
    </div>
  );
}

type EmailProps = {
  email: string;
  verified: boolean;
};

function Email({ email, verified }: EmailProps) {
  const [inner, setInner] = useState(email);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <ClientOnly
      fallback={
        <Button
          variant="outline"
          className={cn(
            "w-full md:h-8 justify-start font-normal",
            verified ? "" : "bg-amber-200 hover:bg-amber-300"
          )}
        >
          {verified ? (
            email
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              <span>{email}</span>
              <div className="ml-auto flex justify-end items-center gap-1 text-amber-700">
                <CircleAlert className="w-4 h-4" />
                <span className="text-sm">Unverified</span>
              </div>
            </>
          )}
        </Button>
      }
    >
      {() => (
        <>
          <EditEmailDialog
            email={email}
            verified={verified}
            inner={inner}
            setInner={setInner}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
          />
          <DeleteEmailDialog
            dialogOpen={deleteDialogOpen}
            setDialogOpen={setDeleteDialogOpen}
          />
        </>
      )}
    </ClientOnly>
  );
}

type EditEmailDialogProps = {
  email: string;
  verified: boolean;
  inner: string;
  setInner: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditEmailDialog({
  email,
  verified,
  inner,
  setInner,
  dialogOpen,
  setDialogOpen,
  setDeleteDialogOpen,
}: EditEmailDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full md:h-8 justify-start font-normal",
          verified ? "" : "bg-amber-200 hover:bg-amber-300"
        )}
      >
        {verified ? (
          email
        ) : (
          <>
            <span>{email}</span>
            <div className="ml-auto flex justify-end items-center gap-1 text-amber-700">
              <CircleAlert className="w-4 h-4" />
              <span className="text-sm">Unverified</span>
            </div>
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>{email}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EmailForm
          inner={inner}
          setInner={setInner}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
        />
        <DialogFooter className="items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setInner(email);
              setDialogOpen(false);
            }}
          >
            Never Mind
          </Button>
          <Button form="email" type="submit" disabled>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type EmailFormProps = {
  inner: string;
  setInner: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EmailForm({
  inner,
  setInner,
  setDialogOpen,
  setDeleteDialogOpen,
}: EmailFormProps) {
  const fetcher = useFetcher();

  // useEffect(() => {
  //   if (fetcher.state === "idle" && fetcher.data?.ok && dialogOpen) {
  //     setDialogOpen(false);
  //     fetcher.submit({}, { action: "/login/fetcher", method: "post" });
  //   }
  // }, [fetcher, dialogOpen, setDialogOpen]);

  return (
    <fetcher.Form
      method="post"
      // TODO: Use the pid here
      action="/players/emails"
      id="email"
      className="flex flex-col gap-4"
    >
      <div>
        <Input
          name="email"
          value={inner}
          onChange={(e) => {
            setInner(e.target.value);
          }}
        />
        <Button
          type="button"
          variant="link"
          className="text-xs text-rose-700 p-0 m-0"
          onClick={() => {
            setDialogOpen(false);
            setDeleteDialogOpen(true);
          }}
        >
          Want to delete this email? Click here
        </Button>
      </div>
    </fetcher.Form>
  );
}

type DeleteEmailDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteEmailDialog({
  dialogOpen,
  setDialogOpen,
}: DeleteEmailDialogProps) {
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Never Mind
          </Button>
          <Button
            form="delete-email"
            type="submit"
            variant="destructive"
            disabled
          >
            I&apos;m Sure, Delete This Email
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

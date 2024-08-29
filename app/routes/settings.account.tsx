import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { cn } from "~/lib/utils";
import { type Theme, THEME_DARK, THEME_LIGHT, useTheme } from "~/lib/theme";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const MAXIMUM_EMAILS_ALLOWED = 3;

export default function AccountSettings() {
  return (
    <div className="space-y-10 sm:space-y-6">
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
      <EmailSettings />
      <ThemeSettings />
    </div>
  );
}

function EmailSettings() {
  const emails = [
    { id: 1n, address: "email@web.site", verified: true },
    { id: 3n, address: "email@web.site", verified: false },
  ];
  return (
    <div className="space-y-2 md:w-[24rem]">
      <Label>Emails</Label>
      {emails.length ? (
        <p className="text-xs leading-none text-muted-foreground">
          Click an email to edit, delete, or resend verification emails
        </p>
      ) : null}
      {emails.length === 0 ? null : null}
      {emails.length < MAXIMUM_EMAILS_ALLOWED ? (
        <Button>Add Email</Button>
      ) : null}
      {emails.map((email) => {
        return <Email key={email.id} {...email} />;
      })}
    </div>
  );
}

type EmailProps = {
  id: bigint;
  address: string;
  verified: boolean;
};

function Email({ address, verified }: EmailProps) {
  const [inner, setInner] = useState(address);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [
    resendVerificationEmailDialogOpen,
    setResendVerificationEmailDialogOpen,
  ] = useState(false);

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
            address
          ) : (
            <>
              <span className={cn("", verified ? "" : "text-amber-700")}>
                {address}
              </span>
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
            address={address}
            verified={verified}
            inner={inner}
            setInner={setInner}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            setResendVerificationEmailDialogOpen={
              setResendVerificationEmailDialogOpen
            }
          />
          <DeleteEmailDialog
            dialogOpen={deleteDialogOpen}
            setDialogOpen={setDeleteDialogOpen}
          />
          <ResendVerificationEmailDialog
            dialogOpen={resendVerificationEmailDialogOpen}
            setDialogOpen={setResendVerificationEmailDialogOpen}
          />
        </>
      )}
    </ClientOnly>
  );
}

type EditEmailDialogProps = {
  address: string;
  verified: boolean;
  inner: string;
  setInner: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResendVerificationEmailDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

function EditEmailDialog({
  address,
  verified,
  inner,
  setInner,
  dialogOpen,
  setDialogOpen,
  setDeleteDialogOpen,
  setResendVerificationEmailDialogOpen,
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
          address
        ) : (
          <>
            <span className={cn(verified ? "" : "text-amber-700")}>
              {address}
            </span>
            <div className="ml-auto flex justify-end items-center gap-1 text-amber-700">
              <CircleAlert className="w-4 h-4" />
              <span className="text-sm">Unverified</span>
            </div>
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>{address}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EmailForm
          inner={inner}
          setInner={setInner}
          verified={verified}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setResendVerificationEmailDialogOpen={
            setResendVerificationEmailDialogOpen
          }
        />
        <DialogFooter className="items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setInner(address);
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
  verified: boolean;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResendVerificationEmailDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function EmailForm({
  inner,
  setInner,
  verified,
  setDialogOpen,
  setDeleteDialogOpen,
  setResendVerificationEmailDialogOpen,
}: EmailFormProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      // TODO: Use the pid here
      action="/players/emails"
      id="email"
      className="flex flex-col gap-4"
    >
      <div className="gap-0">
        <Input
          name="email"
          value={inner}
          onChange={(e) => {
            setInner(e.target.value);
          }}
        />
        {verified ? null : (
          <Button
            type="button"
            variant="link"
            className="text-xs text-amber-700 p-0 m-0 h-4"
            onClick={() => {
              setDialogOpen(false);
              setResendVerificationEmailDialogOpen(true);
            }}
          >
            Haven&apos;t received the verification email? Click here to resend.
          </Button>
        )}
        <Button
          type="button"
          variant="link"
          className="text-xs text-rose-700 p-0 m-0 h-4"
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

interface ResendEmailVerificationDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResendVerificationEmailDialog({
  dialogOpen,
  setDialogOpen,
}: ResendEmailVerificationDialogProps) {
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resend Verification Email?</AlertDialogTitle>
          <AlertDialogDescription>
            This will disable any existing verification email and resend to this
            address.
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
          <Button form="resend-verification-email" type="submit" disabled>
            Resend Verification Email
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ThemeSettings() {
  return (
    <div className="space-y-2">
      <Label>Theme</Label>
      <ThemeForm />
    </div>
  );
}

function ThemeForm() {
  const usedTheme = useTheme();
  const fetcher = useFetcher<{ theme: Theme }>({ key: "theme" });
  const theme = fetcher.formData?.get("theme") ?? usedTheme;

  return (
    <>
      <RadioGroup
        onValueChange={(theme) => {
          fetcher.submit(
            { theme },
            {
              method: "post",
              action: "/action/set-theme",
            }
          );
        }}
        value={theme === THEME_DARK ? THEME_DARK : THEME_LIGHT}
        className="flex gap-4 items-center"
      >
        <div className="sm:min-w-60">
          <Label className="[&:has([data-state=checked])>div]:border-primary sm:min-w-60">
            <RadioGroupItem value="light" className="sr-only" />
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
        </div>
        <div className="sm:min-w-60">
          <Label className="[&:has([data-state=checked])>div]:border-primary sm:min-w-60">
            <RadioGroupItem value="dark" className="sr-only" />
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
      </RadioGroup>
    </>
  );
}

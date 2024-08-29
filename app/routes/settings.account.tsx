import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";

import { getSession } from "~/lib/sessions.server";
import { listEmailsForPlayer } from "~/lib/mirror.server";
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
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const MAXIMUM_EMAILS_ALLOWED = 3;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  const reply = await listEmailsForPlayer(pid);

  const serializedEmails = reply.emails.map(({ id, pid, ...rest }) => {
    return {
      id: id.toString(),
      pid: pid.toString(),
      ...rest,
    };
  });

  return { emails: serializedEmails };
};

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
  const { emails } = useLoaderData<typeof loader>();
  const [addEmailDialogOpen, setAddEmailDialogOpen] = useState(false);

  const verifiedEmailsCount = emails.reduce(
    (
      count: number,
      // TODO: SerializedEmail type
      email: { id: string; pid: string; address: string; verified: boolean }
    ) => {
      return email.verified ? count + 1 : count;
    },
    0
  );

  return (
    <div className="space-y-2 ">
      <Label>Emails</Label>
      {emails.length ? (
        <p className="text-xs leading-none text-muted-foreground">
          Click an email to edit, delete, or resend verification emails
        </p>
      ) : null}
      {emails.length === 0 ? <NoEmailsAlert /> : null}
      {emails.length && verifiedEmailsCount === 0 ? (
        <NoVerifiedEmailsAlert />
      ) : null}
      {emails.length < MAXIMUM_EMAILS_ALLOWED ? (
        <div>
          <ClientOnly fallback={<AddEmailButton />}>
            {() => (
              <AddEmailDialog
                dialogOpen={addEmailDialogOpen}
                setDialogOpen={setAddEmailDialogOpen}
              >
                <AddEmailButton />
              </AddEmailDialog>
            )}
          </ClientOnly>
        </div>
      ) : null}
      <div className="md:w-[24rem]">
        {emails.map(
          (email: {
            id: string;
            pid: string;
            address: string;
            verified: boolean;
          }) => {
            return <Email key={email.id} {...email} />;
          }
        )}
      </div>
    </div>
  );
}

function AddEmailButton() {
  return <Button>Add Email</Button>;
}

function NoEmailsAlert() {
  return (
    <Alert variant="warning">
      <CircleAlert className="h-5 w-5" />
      <AlertTitle>You don&apos;t have any emails!</AlertTitle>
      <AlertDescription>
        You won&apos;t be able to play without a verified email. Click the
        button below to add one.
      </AlertDescription>
    </Alert>
  );
}

function NoVerifiedEmailsAlert() {
  return (
    <Alert variant="warning">
      <CircleAlert className="h-5 w-5" />
      <AlertTitle>You don&apos;t have any verified emails!</AlertTitle>
      <AlertDescription>
        You won&apos;t be able to play without a verified email. Add a new one
        or resend the verification below.
      </AlertDescription>
    </Alert>
  );
}

type EmailProps = {
  id: number | string;
  address: string;
  verified: boolean;
};

function Email({ id, address, verified }: EmailProps) {
  const [inner, setInner] = useState(address);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [
    resendVerificationEmailDialogOpen,
    setResendVerificationEmailDialogOpen,
  ] = useState(false);

  return (
    <ClientOnly
      fallback={<EmailButton address={address} verified={verified} />}
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
          >
            <EmailButton address={address} verified={verified} />
          </EditEmailDialog>
          <DeleteEmailDialog
            id={id}
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

interface EmailButtonProps extends React.PropsWithChildren {
  address: string;
  verified: boolean;
}

function EmailButton({ address, verified }: EmailButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full md:w-[24rem] md:h-8 justify-start font-normal",
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
  );
}

interface AddEmailDialogProps extends React.PropsWithChildren {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddEmailDialog({
  children,
  dialogOpen,
  setDialogOpen,
}: AddEmailDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Add New Email Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddEmailForm />
        <DialogFooter className="items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Never Mind
          </Button>
          <Button form="add-email" type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddEmailForm() {
  const [address, setAddress] = useState("");

  return (
    <Form
      method="post"
      // TODO: Use the pid here
      action="/players/emails"
      id="add-email"
      className="flex flex-col gap-4"
      navigate={false}
      replace
      reloadDocument
    >
      <div className="gap-0">
        <Input
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}

interface EditEmailDialogProps extends React.PropsWithChildren {
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
}

function EditEmailDialog({
  children,
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
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>{address}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditEmailForm
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

interface EditEmailFormProps {
  inner: string;
  setInner: React.Dispatch<React.SetStateAction<string>>;
  verified: boolean;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResendVerificationEmailDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function EditEmailForm({
  inner,
  setInner,
  verified,
  setDialogOpen,
  setDeleteDialogOpen,
  setResendVerificationEmailDialogOpen,
}: EditEmailFormProps) {
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
  id: number | string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteEmailDialog({
  id,
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
        <Form
          className="hidden aria-hidden"
          id="delete-email"
          method="post"
          action={`/players/email/${id}/destroy`}
          navigate={false}
          replace
          reloadDocument
        />
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

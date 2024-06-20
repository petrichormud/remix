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
      )}
    </ClientOnly>
  );
}

type EmailFormProps = {
  inner: string;
  setInner: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EmailForm({ inner, setInner, setDialogOpen }: EmailFormProps) {
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
          }}
        >
          Want to delete this email? Click here
        </Button>
      </div>
    </fetcher.Form>
  );
}

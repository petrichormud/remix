import React, { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { action } from "~/routes/players";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

function registerFormDisabled(
  username: string,
  passphrase: string,
  confirmPassphrase: string
): boolean {
  if (
    username.length == 0 ||
    passphrase.length == 0 ||
    confirmPassphrase.length == 0
  )
    return true;
  if (passphrase != confirmPassphrase) return true;
  return false;
}

export function RegisterDialog({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [confirmPassphrase, setConfirmPassphrase] = useState("");

  // TODO: Handle error output from the action here

  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Please enter a username and passphrase to create an account
              </DialogDescription>
            </DialogHeader>
            <RegisterForm
              username={username}
              setUsername={setUsername}
              passphrase={passphrase}
              setPassphrase={setPassphrase}
              confirmPassphrase={confirmPassphrase}
              setConfirmPassphrase={setConfirmPassphrase}
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
                form="register"
                type="submit"
                disabled={registerFormDisabled(
                  username,
                  passphrase,
                  confirmPassphrase
                )}
              >
                Let&apos;s Go!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
}

type RegisterFormProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  passphrase: string;
  setPassphrase: React.Dispatch<React.SetStateAction<string>>;
  confirmPassphrase: string;
  setConfirmPassphrase: React.Dispatch<React.SetStateAction<string>>;
};

export function RegisterForm({
  username,
  setUsername,
  passphrase,
  setPassphrase,
  confirmPassphrase,
  setConfirmPassphrase,
}: RegisterFormProps) {
  const fetcher = useFetcher<typeof action>({ key: "register" });

  return (
    <fetcher.Form
      method="post"
      action="/players"
      id="register"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-username">Username</Label>
        <Input
          id="register-username"
          name="username"
          value={username}
          onChange={(e) => {
            // TODO: Sanitize this on the way in
            setUsername(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-passphrase">Passphrase</Label>
        <Input
          id="register-passphrase"
          name="passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => {
            setPassphrase(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-confirm-passphrase">Confirm Passphrase</Label>
        <Input
          id="register-confirm-passphrase"
          name="confirmPassphrase"
          type="password"
          value={confirmPassphrase}
          onChange={(e) => {
            setConfirmPassphrase(e.target.value);
          }}
        />
      </div>
    </fetcher.Form>
  );
}

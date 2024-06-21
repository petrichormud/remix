import React, { useState, useEffect } from "react";
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
  password: string,
  confirmPassword: string
): boolean {
  if (
    username.length == 0 ||
    password.length == 0 ||
    confirmPassword.length == 0
  )
    return true;
  if (password != confirmPassword) return true;
  return false;
}

export function RegisterDialog({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Please enter a username and password to create an account
              </DialogDescription>
            </DialogHeader>
            <RegisterForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
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
                  password,
                  confirmPassword
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
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  dialogOpen,
  setDialogOpen,
}: RegisterFormProps) {
  const fetcher = useFetcher<typeof action>({ key: "register" });

  // TODO: Set this up to reset the fetcher state
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok && dialogOpen) {
      setDialogOpen(false);
      fetcher.submit({}, { action: "/login/fetcher", method: "post" });
    }
  }, [fetcher, dialogOpen, setDialogOpen]);

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
        <Label htmlFor="register-password">Passphrase</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-confirm-password">Confirm Passphrase</Label>
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
    </fetcher.Form>
  );
}

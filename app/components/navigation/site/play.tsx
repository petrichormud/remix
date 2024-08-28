import React, { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

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
import { RegisterForm } from "~/components/navigation/register";

type PlayButtonProps = {
  pid?: number;
};

export function PlayButton({ pid }: PlayButtonProps) {
  const authenticated = Boolean(pid && pid > 0);

  return (
    <ClientOnly fallback={<Button type="button">Play</Button>}>
      {() =>
        authenticated ? (
          <Button type="button">Play</Button>
        ) : (
          <RegisterDialog>
            <Button type="button">Play</Button>
          </RegisterDialog>
        )
      }
    </ClientOnly>
  );
}

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

function RegisterDialog({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [confirmPassphrase, setConfirmPassphrase] = useState("");

  return (
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
  );
}

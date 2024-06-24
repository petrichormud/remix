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

function RegisterDialog({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
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
            disabled={registerFormDisabled(username, password, confirmPassword)}
          >
            Let&apos;s Go!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

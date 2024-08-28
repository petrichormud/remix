import { type ReactNode, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { action } from "~/routes/login";
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

function loginFormDisabled(username: string, passphrase: string): boolean {
  if (username.length == 0) return true;
  if (passphrase.length == 0) return true;
  return false;
}

export function LoginDialog({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const fetcher = useFetcher<typeof action>({ key: "login" });

  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Log In</DialogTitle>
              <DialogDescription>
                Please enter your username and passphrase to log in
              </DialogDescription>
              {fetcher.data?.error ? "Sorry, couldn't log you in." : null}
            </DialogHeader>
            <LoginForm
              username={username}
              setUsername={setUsername}
              passphrase={passphrase}
              setPassphrase={setPassphrase}
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
                form="login"
                type="submit"
                disabled={loginFormDisabled(username, passphrase)}
              >
                Log In
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
}

type LoginFormProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  passphrase: string;
  setPassphrase: React.Dispatch<React.SetStateAction<string>>;
};

function LoginForm({
  username,
  setUsername,
  passphrase,
  setPassphrase,
}: LoginFormProps) {
  const fetcher = useFetcher<typeof action>({ key: "login" });

  return (
    <fetcher.Form
      method="post"
      action="/login"
      id="login"
      className="flex flex-col gap-4"
    >
      <div>
        <Label htmlFor="login-username" className="text-right">
          Username
        </Label>
        <Input
          id="login-username"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="login-passphrase" className="text-right">
          Passphrase
        </Label>
        <Input
          id="login-passphrase"
          name="passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => {
            setPassphrase(e.target.value);
          }}
        />
      </div>
    </fetcher.Form>
  );
}

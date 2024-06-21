import { type ReactNode, useState, useEffect } from "react";
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

function loginFormDisabled(username: string, password: string): boolean {
  if (username.length == 0) return true;
  if (password.length == 0) return true;
  return false;
}

export function LoginDialog({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ClientOnly fallback={children}>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Log In</DialogTitle>
              <DialogDescription>
                Please enter your username and password to log in
              </DialogDescription>
            </DialogHeader>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
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
                form="login"
                type="submit"
                disabled={loginFormDisabled(username, password)}
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
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  dialogOpen,
  setDialogOpen,
}: LoginFormProps) {
  const fetcher = useFetcher<typeof action>({ key: "login" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok && dialogOpen) {
      setDialogOpen(false);
      fetcher.submit({}, { action: "/login/fetcher", method: "post" });
    }
  }, [fetcher, dialogOpen, setDialogOpen]);

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
        <Label htmlFor="login-password" className="text-right">
          Password
        </Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
    </fetcher.Form>
  );
}

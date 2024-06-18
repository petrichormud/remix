import { useEffect } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { loader } from "~/routes/_index";
import { action } from "~/routes/login";

type LoginFormProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  dialogOpen,
  setDialogOpen,
}: LoginFormProps) {
  const fetcher = useFetcher<typeof action>({ key: "login" });
  const { loginError } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok && dialogOpen) {
      setDialogOpen(false);
    }
  }, [fetcher]);

  return (
    <fetcher.Form
      method="post"
      action="/login"
      id="login"
      className="flex flex-col gap-4"
    >
      <div>{loginError ? loginError : null}</div>
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

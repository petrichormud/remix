import { useFetcher } from "@remix-run/react";

import { action } from "~/routes/players";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

type RegisterFormProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
};

export function RegisterForm({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
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

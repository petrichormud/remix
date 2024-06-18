import type React from "react";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useFetcher } from "@remix-run/react";

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
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      action="/players"
      id="register"
      className="flex flex-col gap-4"
    >
      <div>
        <Label htmlFor="register-username" className="text-right">
          Username
        </Label>
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
      <div>
        <Label htmlFor="register-password" className="text-right">
          Passphrase
        </Label>
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
      <div>
        <Label htmlFor="register-confirm-password" className="text-right">
          Confirm Passphrase
        </Label>
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

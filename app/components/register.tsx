import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useFetcher } from "@remix-run/react";

export function RegisterForm() {
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
        <Input id="register-username" name="username" />
      </div>
      <div>
        <Label htmlFor="register-password" className="text-right">
          Password
        </Label>
        <Input id="register-password" name="password" type="password" />
      </div>
      <div>
        <Label htmlFor="register-confirm-password" className="text-right">
          Confirm Password
        </Label>
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
        />
      </div>
    </fetcher.Form>
  );
}

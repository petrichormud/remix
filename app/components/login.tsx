import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useFetcher } from "@remix-run/react";

export function LoginForm() {
  const fetcher = useFetcher({ key: "login" });

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
        <Input id="login-username" name="username" />
      </div>
      <div>
        <Label htmlFor="login-password" className="text-right">
          Password
        </Label>
        <Input id="login-password" name="password" type="password" />
      </div>
    </fetcher.Form>
  );
}

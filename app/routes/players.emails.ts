import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { createEmail } from "~/lib/mirror.server";

interface NewEmailActionInput {
  address?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }
  const form = await request.formData();
  // TODO: Run some validation here
  const { address }: NewEmailActionInput = Object.fromEntries(form);
  if (!address) {
    return { error: "address is required" };
  }
  // TODO: Handle any errors here
  await createEmail(pid, address);
  return redirect("/settings/account");
};

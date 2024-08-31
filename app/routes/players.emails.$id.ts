import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { editEmail } from "~/lib/mirror.server";

interface EditEmailActionInput {
  address?: string;
}

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  if (!params.id) {
    return redirect("/");
  }

  const form = await request.formData();
  // TODO: Run some validation here
  const { address }: EditEmailActionInput = Object.fromEntries(form);
  if (!address) {
    return { error: "address is required" };
  }

  // TODO: Handle any errors here
  await editEmail(pid, params.id, address);

  return redirect("/settings/account");
};

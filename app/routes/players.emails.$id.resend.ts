import { redirect, type ActionFunction } from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { sendVerificationEmail } from "~/lib/mirror.server";

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    throw redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    throw redirect("/");
  }
  if (!params.id) {
    return redirect("/");
  }

  await sendVerificationEmail(pid, params.id);

  return redirect("/verify/success");
};

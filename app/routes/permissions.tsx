import {
  type MetaFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { PlayerPermissions } from "~/lib/permissions";
import { Header } from "~/components/header";

import tailwind from "~/styles/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "PetrichorMUD" },
    { name: "description", content: "A modern take on a retro-style MUD" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwind }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    const pid = session.get("pid");
    if (!pid) {
      return redirect("/");
    }
    const permissionsReply = await playerPermissions(pid);
    if (
      !permissionsReply.names.includes("grant-all") ||
      !permissionsReply.names.includes("revoke-all")
    ) {
      return redirect("/");
    }
    return { pid, permissionNames: permissionsReply.names };
  } else {
    return redirect("/");
  }
}

export default function Index() {
  const { pid, permissionNames } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main>Permissions</main>
    </>
  );
}

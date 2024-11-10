import {
  type MetaFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { PlayerPermissions } from "~/lib/permissions";
import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

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
  if (!session.has("pid")) return redirect("/");
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  const permissionsReply = await playerPermissions(pid);

  return {
    pid,
    permissionNames: permissionsReply.names,
  };
}

export default function Characters() {
  const { pid, permissionNames } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main></main>
      <Footer />
    </>
  );
}

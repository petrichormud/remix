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

  // TODO: Pull some of this typography out into components
  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main className="container flex flex-col gap-6 mb-24 sm:mb-10">
        <section id="current">
          <h1 className="mt-24 text-3xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            Current Character
          </h1>
          <div className="pt-10 sm:pt-6 text-muted-foreground">
            You don&apos;t have a current character.
          </div>
        </section>
        <section id="approved">
          <h1 className="mt-24 text-3xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            Approved Characters
          </h1>
          <div className="pt-10 sm:pt-6 text-muted-foreground">
            You don&apos;t have any approved characters.
          </div>
        </section>
        <section id="in-review">
          <h1 className="mt-24 text-3xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            Characters In Review
          </h1>
          <div className="pt-10 sm:pt-6 text-muted-foreground">
            You don&apos;t have any characters in review.
          </div>
        </section>
        <section id="unsubmitted">
          <h1 className="mt-24 text-3xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
            In Progress
          </h1>
          <div className="pt-10 sm:pt-6 text-muted-foreground">
            You don&apos;t have any unsubmitted or in-progress characters.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

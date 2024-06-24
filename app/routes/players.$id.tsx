import {
  type LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { Lock } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { Header } from "~/components/header";
import { SidebarNav } from "~/components/sidebar-nav";
import { Separator } from "~/components/ui/separator";

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
  if (
    !permissionsReply.names.includes("grant-all") ||
    !permissionsReply.names.includes("revoke-all")
  ) {
    return redirect("/");
  }

  return { pid, permissionNames: permissionsReply.names };
}

const sidebarNavItems = [
  {
    Icon: Lock,
    title: "Permissions",
    to: function (id: string) {
      return `/players/${id}/permissions`;
    },
  },
];

export default function Players() {
  const { pid } = useLoaderData<typeof loader>();
  const { id } = useParams();
  if (!id) {
    // TODO: Raise an error here
    return <></>;
  }

  return (
    <>
      <Header pid={pid} />
      <main className="flex justify-center items-center">
        <div className="w-full max-w-screen-2xl space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Player View</h2>
            <p className="text-muted-foreground">
              View and manage this player&apos;s settings
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav
                items={sidebarNavItems.map(({ to, ...item }) => {
                  return { to: to(id), ...item };
                })}
              />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

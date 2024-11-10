import type {
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UserCog, Bell, Lock } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { PlayerPermissions } from "~/lib/permissions";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { SidebarNav } from "~/components/ui/sidebar-nav";
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

  return { pid, permissionNames: permissionsReply.names };
}

const sidebarNavItems = [
  {
    Icon: UserCog,
    title: "Account",
    to: "/settings/account",
  },
  {
    Icon: Bell,
    title: "Notifications",
    to: "/settings/notifications",
  },
  {
    Icon: Lock,
    title: "Passphrase",
    to: "/settings/passphrase",
  },
];

export default function Settings() {
  const { pid, permissionNames } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main className="flex justify-center items-center">
        <div className="w-full max-w-screen-2xl space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

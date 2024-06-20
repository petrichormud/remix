import { useState } from "react";
import type {
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UserCog, Bell, Lock } from "lucide-react";

import { Header } from "~/components/header";
import { getSession } from "~/sessions.server";
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
  if (session.has("pid")) {
    const pid = session.get("pid");
    return { pid };
  } else {
    // TODO: Render a login page here instead
    return redirect("/");
  }
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
  const { pid } = useLoaderData<typeof loader>();

  return (
    <>
      <Header pid={pid} />
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
    </>
  );
}

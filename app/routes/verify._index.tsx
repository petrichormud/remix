import { Form } from "@remix-run/react";
import {
  redirect,
  type LoaderFunction,
  type ActionFunction,
  type MetaFunction,
  type LinksFunction,
} from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions, verifyEmail } from "~/lib/mirror.server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

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

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    throw redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    throw redirect("/");
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("t");
  if (!token) {
    throw redirect("/");
  }
  const permissionsReply = await playerPermissions(pid);

  return { pid, permissionNames: permissionsReply.names };
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    throw redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    throw redirect("/");
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("t");
  if (!token) {
    throw redirect("/");
  }

  await verifyEmail(pid, token);

  return redirect("/verify/success");
};

export default function Verify() {
  return (
    <>
      <main className="flex justify-center items-center h-screen w-screen">
        <Card className="sm:p-6 p-10">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
            <CardDescription>
              Click Verify Email below to verify your email
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Form method="post">
              <Button>Verify Email</Button>
            </Form>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

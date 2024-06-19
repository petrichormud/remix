import type {
  MetaFunction,
  LinksFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Form } from "@remix-run/react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { getSession, commitSession } from "~/sessions.server";

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

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("pid");
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  return null;
}

export default function Logout() {
  return (
    <>
      <main className="h-screen w-screen">
        <section className="h-full w-full flex justify-center items-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Log Out</CardTitle>
              <CardDescription>
                Are you sure you&apos;d like to log out?
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2 justify-end">
              <Link to="/">
                <Button type="button" variant="outline">
                  Go Back
                </Button>
              </Link>
              <Form action="/logout" method="post">
                <Button>Log Out</Button>
              </Form>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
}

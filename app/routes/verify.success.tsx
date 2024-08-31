import { Link } from "@remix-run/react";
import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
  type LinksFunction,
} from "@remix-run/node";

import { getSession } from "~/lib/sessions.server";
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

  return { pid };
};

export default function VerifySuccess() {
  return (
    <>
      <main className="flex justify-center items-center h-screen w-screen">
        <Card className="sm:p-6 p-10">
          <CardHeader>
            <CardTitle>Success!</CardTitle>
            <CardDescription>Your email has been verified.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Link to="/">
              <Button>Return to site</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

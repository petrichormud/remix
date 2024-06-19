import type {
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Header } from "~/components/header";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions.server";

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

export default function Profile() {
  const { pid } = useLoaderData<typeof loader>();
  return (
    <>
      <Header pid={pid} />
      <main>
        <h1 id="emails">Emails</h1>
        <h1 id="passphrase">Passphrase</h1>
      </main>
    </>
  );
}

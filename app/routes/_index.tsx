import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
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
    console.log("pid is ", pid);
    return { pid, loginError: session.get("loginError") || null };
  } else {
    return { pid: 0, loginError: session.get("loginError") || null };
  }
}

export default function Index() {
  const { pid } = useLoaderData<typeof loader>();
  return (
    <>
      <Header pid={pid} />
      <main></main>
    </>
  );
}

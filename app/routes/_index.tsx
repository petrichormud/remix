import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Header } from "~/components/header";
import { useLoaderData } from "@remix-run/react";

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

export function loader() {
  const pid = 0;
  return { pid };
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

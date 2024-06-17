import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Header } from "~/components/header";

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

export default function Index() {
  return (
    <>
      <Header />
      <main></main>
    </>
  );
}

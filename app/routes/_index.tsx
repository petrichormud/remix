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
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Welcome to Remix</h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/start/quickstart"
              rel="noreferrer"
            >
              5m Quick Start
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/start/tutorial"
              rel="noreferrer"
            >
              30m Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

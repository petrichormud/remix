import { useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeContext } from "~/context/theme";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  console.log("theme is " + theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Outlet />
    </ThemeContext.Provider>
  );
}

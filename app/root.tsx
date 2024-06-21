import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { type LoaderFunction, json } from "@remix-run/node";

import { cn } from "~/lib/utils";
import { THEME_DARK, useTheme } from "~/lib/theme";
import { getTheme } from "~/lib/theme.server";

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getTheme(request);
  return json({
    theme,
  });
};

function Document({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <html
      lang="en"
      className={cn({ dark: theme === THEME_DARK })}
      data-theme={theme}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
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

function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export default function AppWithProviders() {
  return <App />;
}

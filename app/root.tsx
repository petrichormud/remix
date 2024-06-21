import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from "remix-themes";

import { cn } from "~/lib/utils";
import { themeSessionResolver } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
};

function Document({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="en" data-theme={theme ?? ""} className={cn(theme ? theme : "")}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
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
  const { theme } = useLoaderData<typeof loader>();
  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeAction="/action/set-theme"
      disableTransitionOnThemeChange
    >
      <App />
    </ThemeProvider>
  );
}

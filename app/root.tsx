import { useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeContext } from "~/context/theme";

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className="dark">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export default function AppWithProviders() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <App />
    </ThemeContext.Provider>
  );
}

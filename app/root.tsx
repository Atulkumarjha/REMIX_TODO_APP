import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { ThemeScript, useTheme } from "./components/ThemeScript";
import { parseTheme } from "./lib/theme-cookie.server";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = await parseTheme(request);
 
  return json({ theme }, { headers: { Vary: "Cookie" } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme() === "dark" ? "dark" : "";
  return (
    <html lang="en"  className={`bg-white/90 font-system antialiased dark:bg-gray-900 ${theme}`}>
      <head>
        <ThemeScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  return <Outlet />;
}

import { createCookie } from "@remix-run/node";
import type { Theme } from "~/type";
 
const cookie = createCookie("theme", {
  maxAge: 31_536_000,
});
 
export function validateTheme(value: unknown): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}
 
export async function parseTheme(request: Request) {
  const header = request.headers.get("Cookie");
  const vals = await cookie.parse(header);
 
  const theme = vals?.theme;
  if (validateTheme(theme)) {
    return theme;
  } else {
    return "system";
  }
}
 
export function serializeTheme(theme: Theme) {
  const eatCookie = theme === "system";
  if (eatCookie) {
    return cookie.serialize({}, { expires: new Date(0), maxAge: 0 });
  } else {
    return cookie.serialize({ theme });
  }
}
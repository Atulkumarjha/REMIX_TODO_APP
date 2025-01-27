import { type ActionFunctionArgs, redirect } from "@remix-run/node";
 
import { serializeTheme, validateTheme } from "~/lib/theme-cookie.server";
 
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
 
  const theme = formData.get("theme");
  if (!validateTheme(theme)) {
    throw new Response("Invalid theme", { status: 400 });
  }
 
  let returnTo = formData.get("returnTo");
  if (
    !returnTo ||
    typeof returnTo !== "string" ||
    !returnTo.startsWith("/") ||
    returnTo.startsWith("//")
  ) {
    returnTo = "/";
  }
 
  return redirect(returnTo, {
    headers: { "Set-Cookie": await serializeTheme(theme) },
  });
}
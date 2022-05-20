import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}
export async function logout(request: Request, url: string = "/s2ap") {
  const session = await getUserSession(request);
  return redirect(url, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

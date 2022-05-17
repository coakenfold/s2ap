import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const out = await authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success",
  });
  return out;
};

export function ErrorBoundary({ error }) {
  console.error(error);
  return <div>Error</div>;
}

export default function Spotify() {
  return <div className="flex justify-center p-8">s2ap/authorize/spotify</div>;
}

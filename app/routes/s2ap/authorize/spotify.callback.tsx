import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  console.log("@@ authorize/spotify/callback");
  const output = authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success",
  });
  console.log("@@ authorize/spotify/callback:output", output);
  return output;
};

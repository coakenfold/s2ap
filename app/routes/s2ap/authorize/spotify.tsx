import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("authorize/spotify:output");
  const output = await authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success",
  });
  console.log("@@ authorize/spotify:output", output);
  return output;
};

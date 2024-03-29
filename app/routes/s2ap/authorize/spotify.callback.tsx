import type { LoaderFunction } from "@remix-run/node";
import { authentication } from "~/models/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { authenticator } = await authentication(request);
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap",
  });
};

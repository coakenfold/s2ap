import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap",
    failureRedirect: "/s2ap",
  });
};

import type { ActionFunction } from "@remix-run/node";
import { authentication } from "~/models/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const { authenticator } = await authentication(request);

  return await authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap",
  });
};

import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("spotify", request);
};

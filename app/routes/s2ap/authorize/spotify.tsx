import { redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authentication } from "~/models/auth.server";
import { getUserPrefs, userPrefs } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
  const cookie = await getUserPrefs(request);

  const form = await request.formData();
  const formCanRequestEmail = !!(form.get("canRequestEmail") as
    | string
    | undefined);

  cookie.canRequestEmail = formCanRequestEmail;

  return redirect(`/s2ap/authorize/spotify`, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const { authenticator } = await authentication(request);
  return await authenticator.authenticate("spotify", request);
};

export default function Spotify() {
  return (
    <div className="flex justify-center p-8">Authenticating with Spotfiy</div>
  );
}

import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  const output = authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success",
  });
  console.log("authorize/spotify/callback >>> output =", output);
  console.log("authorize/spotify/callback >>> request =", request);
  return output;
};

export default function Spotify() {
  return (
    <div className="flex justify-center p-8">
      s2ap/authorize/spotify/callback
    </div>
  );
}

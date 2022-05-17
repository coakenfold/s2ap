import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/models/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/s2ap?status=success",
    // failureRedirect: "/s2ap?status=error",
  });
};

export default function SpotifyCallback() {
  return (
    <div className="flex justify-center p-8">
      s2ap/authorize/spotify/callback
    </div>
  );
}

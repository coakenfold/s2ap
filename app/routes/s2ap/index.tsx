import { useLoaderData, useTransition, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import type { Session, User } from "remix-auth-spotify";
import type { CurrentlyPlaying } from "spotify-types";

import { authentication } from "~/models/auth.server";
import { logout } from "~/session.server";
import { currentlyPlaying } from "~/service/spotify.api.server";
import { Track } from "~/components/track";
import { MiniForm } from "~/components/MiniForm";

export interface LoaderOutput {
  session: Session;
  current: CurrentlyPlaying | null;
  playlistId: string | undefined;
  build: string | undefined;
}
export const loader: LoaderFunction = async ({ request }) => {
  const { spotifyStrategy } = await authentication(request);
  const session = await spotifyStrategy.getSession(request);

  if (!session || !session?.user) {
    return redirect("/s2ap/login");
  }
  const build = process.env.BUILD;
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("playlistId");

  const current = session?.accessToken
    ? await currentlyPlaying(session.accessToken)
    : null;

  if (current?.error?.status === 401) {
    return await logout({ request });
  }

  return {
    session,
    current,
    playlistId,
    build,
  };
};

export default function Index() {
  const { session, current, playlistId, build } = useLoaderData<LoaderOutput>();
  const user = session.user as User;
  const transition = useTransition();
  const isSubmitting = transition.state === "submitting";

  return (
    <div className="flex justify-center p-8">
      <main className="w-full max-w-3xl">
        <div className="flex items-center justify-between space-x-4">
          <h1
            className="font-light text-slate-900 dark:text-slate-50"
            title="Song to Album Playlist"
          >
            S2ap
          </h1>

          <div className="flex items-center space-x-4">
            <Link
              className="dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200"
              to={"/s2ap"}
            >
              Reload
            </Link>

            <Link
              className="dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200"
              to={"/s2ap/account"}
            >
              Account
            </Link>

            <MiniForm action="/s2ap/logout">
              <button
                className="dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200"
                type="submit"
              >
                Logout
              </button>
            </MiniForm>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl ">
          Hello <strong className="font-extrabold">{user.name}!</strong>
          👋
        </h1>
        {current?.is_playing ? (
          <Track
            current={current}
            isSubmitting={isSubmitting}
            user={user}
            playlistId={playlistId}
          />
        ) : (
          <div>
            <p className="py-8 text-slate-900 dark:text-slate-50">
              🙉 Play something in Spotify and then{" "}
              <a
                href="/s2ap"
                className="dark:text-sky-40 font-bold tracking-tight text-sky-500 "
              >
                reload
              </a>{" "}
              this page
            </p>
          </div>
        )}

        {build ? (
          <small className="mt-16 mb-8 block bg-slate-900 text-right text-xs text-slate-800 ">
            {build}
          </small>
        ) : null}
      </main>
    </div>
  );
}

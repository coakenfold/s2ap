import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export interface LoaderOutput {
  build: string | undefined;
}
export const loader: LoaderFunction = async ({ request }) => {
  const build = process.env.BUILD;

  return {
    build,
  };
};
export default function Index() {
  const { build } = useLoaderData<LoaderOutput>();
  return (
    <div className="flex justify-center p-8">
      <main className="w-full max-w-3xl">
        <h1
          className="text-sm font-light text-slate-900 dark:text-slate-50  sm:text-sm"
          title="Song to Album Playlist"
        >
          S2ap
        </h1>

        <a
          href="s2ap"
          className=" dark:text-sky-40 tracking-tight tracking-tight text-sky-500 hover:text-sky-200 sm:text-4xl"
        >
          When I listen to Spotify, often a song comes on that I dig and I click
          through to the album details. If it's an album (and not a single) I'll
          create a playlist that I add to an `In Coming` folder. This is too
          cumbersome — I created an app which has a button that does (almost*)
          all of the aforementioned steps, come see
        </a>
        <div>
          <small>
            * Currently, Spotify doesn't allow apps to create playlists inside
            of folders
          </small>
          {build ? (
            <small className="mt-16 mb-8 block bg-slate-900 text-right text-xs text-slate-800 ">
              {build}
            </small>
          ) : null}
        </div>
      </main>
    </div>
  );
}

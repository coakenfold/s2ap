import { /*redirect,*/ json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUserPrefs } from "~/cookies";

import type { LoaderFunction } from "@remix-run/node";

export interface LoaderOutput {
  build: string | undefined;
  canRequestEmail: boolean;
}
export const loader: LoaderFunction = async ({ request }) => {
  const build = process.env.BUILD;
  const cookie = await getUserPrefs(request);

  return json({
    build,
    canRequestEmail:
      cookie.canRequestEmail === undefined ? true : cookie.canRequestEmail,
  });
};
export default function Index() {
  const { build, canRequestEmail } = useLoaderData<LoaderOutput>();
  return (
    <div className="flex justify-center p-8">
      <main className="w-full max-w-3xl">
        <h1
          className="font-light text-slate-900 dark:text-slate-50"
          title="Song to Album Playlist"
        >
          S2ap
        </h1>
        <Form method="post" action="/s2ap/authorize/spotify">
          <input
            type="checkbox"
            id="canRequestEmail"
            name="canRequestEmail"
            defaultChecked={canRequestEmail}
          />
          <label htmlFor="canRequestEmail">Share my email with S2Ap</label>
          <button className="dark:highlight-white/20 my-2 flex h-14 w-full items-center justify-center rounded-lg bg-slate-900 px-6 text-xl font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto">
            Log in with Spotify
          </button>
        </Form>
        <div>
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

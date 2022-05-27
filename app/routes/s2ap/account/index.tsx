import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";

import { authentication } from "~/models/auth.server";

import { logout } from "~/session.server";

import { getUserBySpotifyId } from "~/models/user.server";
import type { User } from "~/models/user.server";

import {
  getAccountBySpotifyId,
  updateAccountBySpotifyId,
  deleteAccountBySpotifyId,
} from "~/models/account.server";

import type { Account } from "~/models/account.server";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const { spotifyStrategy } = await authentication(request);
  const session = await spotifyStrategy.getSession(request);
  if (!session) {
    return redirect("/s2ap#noSession");
  }
  const sessionUser = session?.user as User;

  const user = await getUserBySpotifyId(sessionUser.id);
  const account = await getAccountBySpotifyId(sessionUser.id);

  // Ensure the user is editing their own data
  if (session?.user?.id !== user?.spotifyId) {
    return redirect("/s2ap#noSessionUserId");
  }
  if (!account) {
    return redirect("/s2ap#noAccount");
  }

  const form = await request.formData();
  const formTarget = form.get("formTarget");

  if (formTarget === "delete") {
    const accountDelete = await deleteAccountBySpotifyId(account.spotifyId);
    console.log("accountDelete", accountDelete);
    return logout(request, "/s2ap/account/deleted");
  }
  if (formTarget === "settings") {
    const formNewsletter = form.get("newsletter");
    const wantsNewsletter = !!formNewsletter;
    const accountUpdate = await updateAccountBySpotifyId({
      spotifyId: account.spotifyId,
      data: { newsletter: wantsNewsletter },
    });
    console.log("accountUpdate", accountUpdate);
    return redirect("/s2ap/account");
  }

  return redirect("/s2ap/account");
};

export interface LoaderOutput {
  user: User;
  account: Account;
}
export const loader: LoaderFunction = async ({ request }) => {
  const { spotifyStrategy } = await authentication(request);
  const session = await spotifyStrategy.getSession(request);

  if (!session?.user) {
    return redirect("/s2ap");
  }

  const spotifyId = session?.user?.id;
  const user = await getUserBySpotifyId(spotifyId);
  if (!user) {
    return redirect("/s2ap");
  }

  const account = await getAccountBySpotifyId(spotifyId);

  if (!account) {
    return redirect("/s2ap");
  }
  return { user, account };
};
export default function AccountManagement() {
  const { user, account } = useLoaderData<LoaderOutput>();
  const { spotifyId, email } = user;
  const [checked, setChecked] = useState(account?.preferences.newsletter);

  const subHeader =
    "sm:text-3xl text-3xl mb-2 text-slate-900 dark:text-slate-50";
  const section = "my-10";
  return (
    <div className="flex justify-center p-8">
      <main className="w-full max-w-3xl">
        <div className="flex items-center justify-between space-x-4">
          <h1
            className="font-light text-slate-900 dark:text-slate-50"
            title="Song to Album Playlist"
          >
            S2ap | Account
          </h1>

          <div className="flex items-center space-x-4">
            <Link
              className="dark:text-sky-40 tracking-tight text-sky-500 hover:text-sky-200"
              to={"/s2ap"}
            >
              Home
            </Link>
          </div>
        </div>
        <div>
          <h1 className="my-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Account
          </h1>
          <section className={section}>
            <h2 className={subHeader}>Details</h2>
            <table className="w-full  text-left">
              <thead>
                <tr>
                  <th>Spotify ID</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{spotifyId}</td>
                  <td>{email ? email : "Not shared with S2ap"}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {email ? (
            <section className={section}>
              <h2 className={subHeader}>Change settings</h2>

              <Form method="post">
                <fieldset className="my-2 ">
                  <input type="hidden" name="formTarget" value="settings" />
                  <input
                    type="checkbox"
                    name="newsletter"
                    id="newsletter"
                    defaultChecked={checked}
                    onClick={() => {
                      setChecked(!checked);
                    }}
                  />{" "}
                  <label htmlFor="newsletter">
                    I'll accept (the occasional) email from S2ap
                  </label>
                </fieldset>
                <button
                  className="dark:highlight-white/20 my-4 flex w-full items-center justify-center rounded-lg bg-slate-900 py-2 px-4 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
                  type="submit"
                >
                  Update
                </button>
              </Form>
            </section>
          ) : (
            <></>
          )}

          <section className={section}>
            <h2 className={subHeader}>Delete account</h2>

            <Form method="post">
              <fieldset className="my-2 ">
                <input type="hidden" name="formTarget" value="delete" />
                <input type="hidden" name="spotifyId" value={spotifyId} />

                <button
                  className="dark:highlight-white/20 flex w-full items-center justify-center rounded-lg bg-red-900 py-2 px-4 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50 dark:bg-rose-500 dark:hover:bg-rose-400 sm:w-auto"
                  type="submit"
                >
                  Delete
                </button>
              </fieldset>
            </Form>
          </section>

          <div className="my-20">
            <section className={section}>
              <h2 className={subHeader}>Privacy policy</h2>

              <p className="mb-2">
                We save your email and Spotify user name. We won't sell or share
                this information
              </p>
              <p>
                We would like to send you a newsletter at some point in the
                future. You can opt out using the form above
              </p>
            </section>

            <section className={section}>
              <h2 className={subHeader}>Attribution</h2>

              <p className="mt-2 mb-6">Data provided by Spotify</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="68px"
                width="68px"
                version="1.1"
                viewBox="0 0 168 168"
              >
                <path
                  fill="#1ED760"
                  d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                />
              </svg>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

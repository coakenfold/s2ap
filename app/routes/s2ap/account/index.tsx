import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";

import { spotifyStrategy } from "~/models/auth.server";

import { MiniForm } from "~/components/MiniForm";

import { getUserByEmail } from "~/models/user.server";
import type { User } from "~/models/user.server";

import {
  getAccountBySpotifyId,
  updateAccountBySpotifyId,
  deleteAccountBySpotifyId,
} from "~/models/account.server";
import type { Account } from "~/models/account.server";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);
  const user = await getUserByEmail(session?.user?.email);
  const account = await getAccountBySpotifyId(user?.spotifyId);
  console.log({
    session: session?.user,
    user,
    account,
  });
  // Ensure the user is editing their own data
  if (session?.user?.id !== user?.spotifyId) {
    return redirect("/s2ap/account#trickeryAfoot");
  }
  if (!account) {
    return redirect("/s2ap/account#whoThis");
  }

  const form = await request.formData();
  const formTarget = form.get("formTarget");

  if (formTarget === "delete") {
    console.log("would have deleted user!");

    return redirect("/s2ap/account/deleted");
  }
  if (formTarget === "settings") {
    const formNewsletter = form.get("newsletter");
    const wantsNewsletter = !!formNewsletter;
    const update = await updateAccountBySpotifyId({
      spotifyId: account.spotifyId,
      data: { newsletter: wantsNewsletter },
    });
    console.log("updated account?", update);

    // return redirect("/s2ap/account");
  }

  return redirect("/s2ap/account");
};

export interface LoaderOutput {
  user: User;
  account: Account;
}
export const loader: LoaderFunction = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);

  if (!session?.user) {
    return redirect("/s2ap");
  }

  const user = await getUserByEmail(session?.user?.email);
  if (!user) {
    return redirect("/s2ap");
  }

  const account = await getAccountBySpotifyId(user.spotifyId);
  return { user, account };
};
export default function AccountManagement() {
  const { user, account } = useLoaderData<LoaderOutput>();
  const { spotifyId, displayName, email } = user;
  const [checked, setChecked] = useState(account.preferences.newsletter);

  const subHeader =
    "sm:text-3xl text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50";
  const header =
    "sm:text-4xl text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50";

  return (
    <div className="flex justify-center p-8">
      <main className="w-full max-w-3xl">
        <div className="flex items-center justify-between space-x-4">
          <h1
            className="font-light text-slate-900  dark:text-slate-50"
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
          <h1 className={header}>{displayName}</h1>
          <p>
            This is your account page. Feel free to change any settings or{" "}
            <span title="｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡">even delete your account</span>
          </p>
          <section className="my-8">
            <h2 className={subHeader}>Details</h2>
            <table>
              <thead>
                <th>Spotify ID</th>
                <th>Email</th>
              </thead>
              <tbody>
                <tr>
                  <td>{spotifyId}</td>
                  <td>{email}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="my-8">
            <h2 className={subHeader}>Change settings</h2>

            <Form method="post">
              <fieldset>
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
                  Send me the occassional email from S2ap
                </label>
              </fieldset>
              <button
                className="dark:text-sky-40 font-bold tracking-tight text-sky-500 "
                type="submit"
              >
                Update
              </button>
            </Form>
          </section>

          <section className="my-8">
            <h2 className={subHeader}>Delete account</h2>
            <MiniForm
              isSubmitting={false}
              method="post"
              inputs={[
                { name: "spotifyId", value: spotifyId },
                { name: "formTarget", value: "delete" },
              ]}
            >
              <button
                className="dark:text-sky-40 font-bold tracking-tight text-sky-500 "
                type="submit"
              >
                Delete
              </button>
            </MiniForm>
          </section>
        </div>
      </main>
    </div>
  );
}

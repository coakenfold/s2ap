import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { spotifyStrategy } from "~/models/auth.server";

import { MiniForm } from "~/components/MiniForm";
import {
  getAllUsers,
  getUserBySpotifyId,
  deleteUserBySpotifyId,
} from "~/models/user.server";
import type { User } from "~/models/user.server";

export interface LoaderOutput {
  displayName: User["displayName"];
  email: User["email"];
  spotifyId: User["spotifyId"];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);

  if (session?.user?.id !== "c_oak") {
    return redirect("/s2ap");
  }
  const users = await getAllUsers();

  return users;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await spotifyStrategy.getSession(request);
  if (session && session?.user?.id === "c_oak") {
    const form = await request.formData();

    const spotifyId = form.get("spotifyId") as string | undefined;

    if (spotifyId) {
      const user = await getUserBySpotifyId(spotifyId);
      if (user) {
        const output = await deleteUserBySpotifyId(spotifyId);
        const urlParam = output?.displayName
          ? `?deleted=${output?.displayName}`
          : "";
        return redirect(`/s2ap/dashboard${urlParam}`);
      }
      return redirect(`/s2ap/dashboard?error=noUser`);
    }
  }
};

export default function Create() {
  const users = useLoaderData<LoaderOutput[]>();

  return (
    <main className="mx-16 my-16">
      <h1 className="font-light text-slate-900 dark:text-slate-50">
        Dashboard
      </h1>

      {users.map(({ displayName, email, spotifyId }) => {
        return (
          <div key={spotifyId}>
            {displayName} - {email}{" "}
            <MiniForm
              isSubmitting={false}
              method="post"
              inputs={[{ name: "spotifyId", value: spotifyId }]}
            >
              <button
                className="dark:text-sky-40 font-bold tracking-tight text-sky-500 "
                type="submit"
              >
                Delete
              </button>
            </MiniForm>
          </div>
        );
      })}
    </main>
  );
}
